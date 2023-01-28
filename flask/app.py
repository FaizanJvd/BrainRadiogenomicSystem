# import tensorflow
from flask import Flask, request, jsonify, send_file
from keras.models import load_model
import nibabel as nib
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import radiomics
import pydicom
from radiomics import featureextractor
import SimpleITK as sitk
import pickle
# from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)


# Nifti to Dicom
def convertNsave(arr, name):
    dicom_file = pydicom.dcmread('./venv/sampleImage/dcmimage.dcm')
    arr = arr.astype('uint16')
    dicom_file.Rows = arr.shape[0]
    dicom_file.Columns = arr.shape[1]
    dicom_file.PhotometricInterpretation = "MONOCHROME2"
    dicom_file.SamplesPerPixel = 1
    dicom_file.BitsStored = 16
    dicom_file.BitsAllocated = 16
    dicom_file.HighBit = 15
    dicom_file.PixelRepresentation = 1
    dicom_file.PixelData = arr.tobytes()
    dicom_file.save_as(os.path.join('./venv/dicomConverted/', f'{name}.dcm'))


# Dicom to Jpg
def Dicom_to_Image(Path):
    DCM_Img = pydicom.read_file(Path)

    rows = DCM_Img.get(0x00280010).value  # Get number of rows from tag (0028, 0010)
    cols = DCM_Img.get(0x00280011).value  # Get number of cols from tag (0028, 0011)

    print("r ", rows, " c", cols)

    Instance_Number = int(DCM_Img.get(0x00200013).value)  # Get actual slice instance number from tag (0020, 0013)

    Window_Center = int(DCM_Img.get(0x00281050).value)  # Get window center from tag (0028, 1050)
    Window_Width = int(DCM_Img.get(0x00281051).value)  # Get window width from tag (0028, 1051)

    Window_Max = int(Window_Center + Window_Width / 2)
    Window_Min = int(Window_Center - Window_Width / 2)
    if (DCM_Img.get(0x00281052) is None):
        Rescale_Intercept = 0
    else:
        Rescale_Intercept = int(DCM_Img.get(0x00281052).value)

    if (DCM_Img.get(0x00281053) is None):
        Rescale_Slope = 1
    else:
        Rescale_Slope = int(DCM_Img.get(0x00281053).value)

    New_Img = np.zeros((rows, cols), np.uint8)
    Pixels = DCM_Img.pixel_array

    for i in range(0, rows):
        for j in range(0, cols):
            Pix_Val = Pixels[i][j]
            Rescale_Pix_Val = Pix_Val * Rescale_Slope + Rescale_Intercept

            if (Rescale_Pix_Val > Window_Max):  # if intensity is greater than max window
                New_Img[i][j] = 255
            elif (Rescale_Pix_Val < Window_Min):  # if intensity is less than min window
                New_Img[i][j] = 0
            else:
                New_Img[i][j] = int(
                    ((Rescale_Pix_Val - Window_Min) / (Window_Max - Window_Min)) * 255)  # Normalize the intensities

    return New_Img, Instance_Number


# Features Extraction Functions.
extractor = featureextractor.RadiomicsFeatureExtractor()


def get_shape_features(image, mask, feat_dic):
    shape = radiomics.shape.RadiomicsShape(image, mask)
    feat_dic['mesh_volume'] = shape.getMeshVolumeFeatureValue()
    feat_dic['surface_area'] = shape.getSurfaceAreaFeatureValue()
    feat_dic['surface_volume_ratio'] = shape.getSurfaceVolumeRatioFeatureValue()
    feat_dic['sphericity'] = shape.getSphericityFeatureValue()
    feat_dic['spherical_disproportion'] = shape.getSphericalDisproportionFeatureValue()
    # feat_dic['maximum_3d_diameter'] = shape.getMaximum3DDiameterFeatureValue()
    # feat_dic['maximum_2d_diameter_slice'] = shape.getMaximum2DDiameterSliceFeatureValue()
    # feat_dic['maximum_2d_diameter_column'] = shape.getMaximum2DDiameterColumnFeatureValue()
    feat_dic['maximum_2d_diameter_row'] = shape.getMaximum2DDiameterRowFeatureValue()
    feat_dic['major_axis_length'] = shape.getMajorAxisLengthFeatureValue()
    feat_dic['minor_axis_length'] = shape.getMinorAxisLengthFeatureValue()
    feat_dic['least_axis_length'] = shape.getLeastAxisLengthFeatureValue()
    feat_dic['elongation'] = shape.getElongationFeatureValue()
    feat_dic['flatness'] = shape.getFlatnessFeatureValue()
    return feat_dic


def get_firstorder_features(image, mask, feat_dic):
    firstorder = radiomics.firstorder.RadiomicsFirstOrder(image, mask)
    firstorder._initCalculation()
    feat_dic['energy'] = firstorder.getEnergyFeatureValue()
    feat_dic['total_energy'] = firstorder.getTotalEnergyFeatureValue()
    feat_dic['entropy'] = firstorder.getEntropyFeatureValue()
    # feat_dic['minimum'] = firstorder.getMinimumFeatureValue()
    feat_dic['10percentile'] = firstorder.get10PercentileFeatureValue()
    feat_dic['90percentile'] = firstorder.get90PercentileFeatureValue()
    feat_dic['maximum'] = firstorder.getMaximumFeatureValue()
    feat_dic['mean'] = firstorder.getMeanFeatureValue()
    feat_dic['median'] = firstorder.getMedianFeatureValue()
    feat_dic['mean_abs_dev'] = firstorder.getMeanAbsoluteDeviationFeatureValue()
    feat_dic['robust_mean_abs_dev'] = firstorder.getRobustMeanAbsoluteDeviationFeatureValue()
    feat_dic['skewness'] = firstorder.getSkewnessFeatureValue()
    feat_dic['kurtosis'] = firstorder.getKurtosisFeatureValue()
    feat_dic['uniformity'] = firstorder.getUniformityFeatureValue()
    return feat_dic


def get_glmc_features(image, mask, feat_dic):
    glcm = radiomics.glcm.RadiomicsGLCM(image, mask)
    glcm._initCalculation()
    feat_dic['autocorrelation'] = glcm.getAutocorrelationFeatureValue()
    feat_dic['joint_avg'] = glcm.getJointAverageFeatureValue()
    feat_dic['contrast'] = glcm.getContrastFeatureValue()
    feat_dic['cluster_prominence'] = glcm.getClusterProminenceFeatureValue()
    feat_dic['cluster_shade'] = glcm.getClusterShadeFeatureValue()
    feat_dic['cluster_tendency'] = glcm.getClusterTendencyFeatureValue()
    feat_dic['correlation'] = glcm.getCorrelationFeatureValue()
    feat_dic['difference_average'] = glcm.getDifferenceAverageFeatureValue()
    feat_dic['difference_entropy'] = glcm.getDifferenceEntropyFeatureValue()
    feat_dic['difference_variance'] = glcm.getDifferenceVarianceFeatureValue()
    feat_dic['joint_energy'] = glcm.getJointEnergyFeatureValue()
    feat_dic['joint_entropy'] = glcm.getJointEntropyFeatureValue()
    return feat_dic


def array_to_mean(dic):
    temp_dic = {}
    for key, val in dic.items():
        v = val.mean()
        temp_dic[key] = v
    return temp_dic


def from_to(from_dic, to_dic):
    for key, val in from_dic.items():
        to_dic[key] = val
    return to_dic

@app.route('/')
def hello():
    return "hello"

@app.route('/segmentation',methods= ["POST", "GET"])
def segmentation():  # put application's code here
    m = load_model('./venv/Models/tNewClast.h5', compile=False)
    t1 = []
    t1d = []
    t2 = []
    flair = []
    t11 = nib.load('./venv/upload/t1.nii.gz').get_fdata()
    t11 = (t11 - t11.mean()) / t11.std()
    t1.append(t11)
    t1dd = nib.load('./venv/upload/t1Gd.nii.gz').get_fdata()
    t1dd = (t1dd - t1dd.mean()) / t1dd.std()
    t1d.append(t1dd)
    t22 = nib.load('./venv/upload/t2.nii.gz').get_fdata()
    t22 = (t22 - t22.mean()) / t22.std()
    t2.append(t22)
    flairr = nib.load('./venv/upload/flair.nii.gz').get_fdata()
    flairr = (flairr - flairr.mean()) / flairr.std()
    flair.append(flairr)

    t1 = np.array(t1)
    t1d = np.array(t1d)
    t2 = np.array(t2)
    flair = np.array(flair)
    print(t1.shape)

    def to_2d(array):
        val_2d_img = []
        for pa in range(0, (array.shape[0])):
            patient = array[pa, :, :, :]
            for m in range(0, 155):
                v2 = patient[:, :, m]
                val_2d_img.append(v2)
        return np.array(val_2d_img)

    t1 = to_2d(t1)
    t1d = to_2d(t1d)
    t2 = to_2d(t2)
    flair = to_2d(flair)

    t1d = np.expand_dims(t1d, axis=3)
    t1 = np.expand_dims(t1, axis=3)
    flair = np.expand_dims(flair, axis=3)
    t2 = np.expand_dims(t2, axis=3)

    combine = np.concatenate((t1d, t1, t2, flair), axis=3)
    print("Combine ", combine.shape)
    result = m.predict(combine)

    result = np.swapaxes(result, 0, 3)
    result = np.squeeze(result, axis=0)

    # save segment as Nifti.
    seg = nib.Nifti1Image(result,affine=np.eye(4))
    nib.save(seg, './venv/upload/segmentation.nii')


    # save image using matplotlib.
    plt.figure(figsize=(12, 8))
    plt.imshow(result[:, :, 70])
    plt.axis("off")
    plt.savefig('./venv/jpgConverted/segmentation.jpg',bbox_inches='tight',pad_inches = 0)

    with open('./venv/jpgConverted/segmentation.jpg', 'rb') as seg_img:
        seg_string = base64.standard_b64encode(seg_img.read())
    seg = str(seg_string)
    seg = "00" + seg
    seg = seg.replace("00b'", "data:image/jpg;base64,").replace("'", "")

    with open('./venv/jpgConverted/flair.jpg', 'rb') as flair_img:
        flair_string = base64.standard_b64encode(flair_img.read())
    flair = str(flair_string)
    flair = "00" + flair
    flair = flair.replace("00b'", "data:image/jpg;base64,").replace("'", "")


    return jsonify(segmentation= seg, original= flair)


path = "D:/FYP DOCuments/ProjectCode/flask/venv/upload/"


@app.route('/api/data', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        t1 = request.files['T1']
        t1.save(os.path.join(path, 't1.nii.gz'))

        t1Gd = request.files['T1Gd']
        t1Gd.save(os.path.join(path, 't1Gd.nii.gz'))

        t2 = request.files['T2']
        t2.save(os.path.join(path, 't2.nii.gz'))

        flair = request.files['Flair']
        flair.save(os.path.join(path, 'flair.nii.gz'))

        # NIFTI to jpg
        plt.figure(figsize=(12, 8))
        plt.axis("off")
        t1 = nib.load('./venv/upload/t1.nii.gz').get_fdata()
        plt.imshow(t1[:, :, 70])
        plt.savefig('./venv/jpgConverted/t1.jpg', bbox_inches='tight', pad_inches=0)
        t1Gd = nib.load('./venv/upload/t1Gd.nii.gz').get_fdata()
        plt.imshow(t1Gd[:, :, 70])
        plt.savefig('./venv/jpgConverted/t1Gd.jpg', bbox_inches='tight', pad_inches=0)
        t2 = nib.load('./venv/upload/t2.nii.gz').get_fdata()
        plt.imshow(t2[:, :, 70])
        plt.savefig('./venv/jpgConverted/t2.jpg', bbox_inches='tight', pad_inches=0)
        flair = nib.load('./venv/upload/flair.nii.gz').get_fdata()
        plt.imshow(flair[:, :, 70])
        plt.savefig('./venv/jpgConverted/flair.jpg', bbox_inches='tight', pad_inches=0)



        # send Jpg to react as Base64
        with open('./venv/jpgConverted/t1.jpg','rb') as t1_img:
            t1_string = base64.standard_b64encode(t1_img.read())
        t1 = str(t1_string)
        t1 = "00"+t1
        t1 = t1.replace("00b'", "data:image/jpg;base64,").replace("'", "")

        with open('./venv/jpgConverted/t1Gd.jpg','rb') as t1Gd_img:
            t1Gd_string = base64.standard_b64encode(t1Gd_img.read())
        t1Gd = str(t1Gd_string)
        t1Gd = "00" + t1Gd
        t1Gd = t1Gd.replace("00b'", "data:image/jpg;base64,").replace("'", "")

        with open('./venv/jpgConverted/t2.jpg','rb') as t2_img:
            t2_string = base64.standard_b64encode(t2_img.read())
        t2 = str(t2_string)
        t2 = "00" + t2
        t2 = t2.replace("00b'", "data:image/jpg;base64,").replace("'", "")

        with open('./venv/jpgConverted/flair.jpg','rb') as flair_img:
            flair_string = base64.standard_b64encode(flair_img.read())
        flair = str(flair_string)
        flair = "00" + flair
        flair = flair.replace("00b'", "data:image/jpg;base64,").replace("'", "")

    return jsonify(t1=t1, t1Gd = t1Gd , t2 = t2 , flair= flair)


@app.route('/features', methods=['GET', 'POST'])
def segment():
    flair = nib.load('./venv/upload/flair.nii.gz').get_fdata()
    seg = nib.load('./venv/upload/segmentation.nii').get_fdata()
    seg = sitk.GetImageFromArray(seg)
    flair = sitk.GetImageFromArray(flair)
    di = {}
    dic1 = get_shape_features(flair, seg, di)
    di = {}
    dic2 = get_firstorder_features(flair, seg, di)
    dic2 = array_to_mean(dic2)
    dic2 = from_to(dic1, dic2)
    dic1 = {}
    di = {}
    dic3 = get_glmc_features(flair, seg, di)
    dic3 = array_to_mean(dic3)
    dic3 = from_to(dic2, dic3)
    dic2 = {}
    print(dic3)
    autocorrelation = np.round(dic3['autocorrelation'], 2)
    contrast = np.round(dic3['contrast'], 2)
    difference_entropy = np.round(dic3['difference_entropy'], 2)
    cluster_tendency = np.round(dic3['cluster_tendency'], 2)
    difference_variance = np.round(dic3['difference_variance'], 2)
    joint_avg = np.round(dic3['joint_avg'],2)
    joint_entropy = np.round(dic3['joint_entropy'], 2)
    skewness = np.round(dic3['skewness'], 2)
    kurtosis = np.round(dic3['kurtosis'], 2)
    mesh_volume = np.round(dic3['mesh_volume'], 2)
    print(type(dic3))
    temp = [dic3]
    dic3 = pd.DataFrame(temp)
    # print(dic3.ndim)
    # print(type(dic3))
    m = load_model('./venv/Models/IDH_prediction_model.h5', compile=False)
    result = m.predict(dic3)
    result = np.absolute(result[0][0])
    if result==1.0:
        result = "yes"
    else:
        result = "No"
    m = load_model('./venv/Models/TCP53_prediction_model.h5', compile=False)
    tcp = m.predict(dic3)
    tcp = np.absolute(tcp[0][0])
    if tcp==1.0:
        result = "WildType"
    else:
        tcp = "Mutant"
    scaler = StandardScaler()
    stest = scaler.fit_transform(dic3)
    m = pickle.load(open('./venv/Models/model1.pkl', 'rb'))
    survival = m.predict(np.array(stest))
    survival = np.round(survival[0],0)


    return jsonify(IDH=result,TCP53=tcp, survival= survival, autocorrelation=str(autocorrelation), contrast= contrast,
                   difference_entropy=difference_entropy,
                   cluster_tendency=cluster_tendency,
                   difference_variance=difference_variance,
                   joint_avg=joint_avg,
                   joint_entropy=joint_entropy,
                   skewness=skewness,
                   kurtosis=kurtosis,
                   mesh_volume=mesh_volume)


if __name__ == '__main__':
    app.run(debug=True)

