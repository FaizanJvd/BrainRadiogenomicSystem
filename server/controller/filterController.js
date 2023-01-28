const Doctor  = require('../model/DoctorSchema');
const Patient = require('../model/PatientSchema');
const Receptionist = require('../model/ReceptionistSchema');
const Radiologist = require('../model/RadiologistSchema');
const Report = require('../model/ReportSchema');
 module.exports = {

    filterDocBySpeciality: async (req, res) => {
        const { speciality } = req.body;
        try {
          const data = await Doctor.find({ $text: { $search: speciality } });
          if (data) {
            console.log("Doctor find");
            return res.send(data);
          } else {
            console.log("not Record");
            return res.status(422).json({ message: "No Record" });
          }
        } catch (err) {
          console.log(err);
        }
      },

     filterPatientByName: async (req, res) => {
        const { name } = req.body;
        try {
            const data = await Patient.find({"name": {$regex: '^' + name, $options: 'i'}},{tokens:0,password:0,cpassword:0});
            if (data) {
                return res.send(data);
            } else {
                console.log("not Record");
                return res.status(422).json({ message: "No Record" });
            }
            }
            catch (err) {
                console.log(err);
            }
        },

        filterReportByStatus: async (req, res) => {
            const { status } = req.body;
            try {
              const data = await Report.find({ $text: { $search: status }},{status:1,date:1}).populate({path:'patient',select:{_id:1,name:1,picture:1}}).populate({path:'doctor',select:{name:1}}).populate({path:'radiologist',select:{name:1}});
              if (data) {
                return res.send(data);
              } else {
                console.log("not Record");
                return res.status(422).json({ message: "No Record" });
              }
            } catch (err) {
              console.log(err);
            }
          },
          filterRadiologistByName: async (req, res) => {
            const { name } = req.body;
            try {
                const data = await Radiologist.find({"name": {$regex: '^' + name, $options: 'i'}},{tokens:0,password:0,cpassword:0})
                if (data) {
                    return res.send(data);
                } else {
                    console.log("not Record");
                    return res.status(422).json({ message: "No Record" });
                }
                }
                catch (err) {
                    console.log(err);
                }
            },
            filterReceptionistByName: async (req, res) => {
                const { name } = req.body;
                try {
                    const data = await Receptionist.find({"name": {$regex: '^' + name, $options: 'i'}},{tokens:0,password:0,cpassword:0})
                    if (data) {
                        return res.send(data);
                    } else {
                        console.log("not Record");
                        return res.status(422).json({ message: "No Record" });
                    }
                    }
                    catch (err) {
                        console.log(err);
                    }
                },


 }