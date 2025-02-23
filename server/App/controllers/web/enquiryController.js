const enquerymodel = require("../../models/enquiry.model");

let enquiryInsert = async (req, res) => {
    let { name, email, phone, message } = req.body;
    let myequerymodel = new enquerymodel({
        name,
        email,
        phone,
        message
    });

    try {
        await myequerymodel.save();
        res.send({ status: 1, msg: "Data successfully saved" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 0, msg: "Failed to save data" });
    }
};

let enquiryList = async (req, res) => {
    try {
        let enquiry = await enquerymodel.find();
        res.send({ status: 1, enquiryList: enquiry });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 0, msg: "Failed to retrieve data" });
    }
};

let enquiryDelete = async (req, res) => {
    let enid = req.params.id;
    try {
        let enquiry = await enquerymodel.findByIdAndDelete(enid);

        if (!enquiry) {
            return res.status(404).send({ status: 0, msg: "Enquiry not found" });
        }

        res.send({ status: 1, msg: "Data successfully deleted", enquiryList: enquiry });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 0, msg: "Failed to delete data" });
    }
};

let enquirysingleRow = async (req, res) => {
    let enid = req.params.id;
    try {
        let enquiry = await enquerymodel.findOne({ _id: enid });

        if (!enquiry) {
            return res.status(404).send({ status: 0, msg: "Enquiry not found" });
        }

        res.send({ status: 1, enquiry });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 0, msg: "Failed to retrieve enquiry" });
    }
};

let enquiryUpdate = async (req, res) => {
    let enid = req.params.id;
    let { name, email, phone, message } = req.body;
    let updateobj = { name, email, phone, message };

    try {
        let updateres = await enquerymodel.updateOne({ _id: enid }, updateobj);

        if (updateres.nModified === 0) {
            return res.status(404).send({ status: 0, msg: "No changes were made" });
        }

        res.send({ status: 1, msg: "Data updated successfully", data: updateres });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 0, msg: "Failed to update data" });
    }
};

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate, enquirysingleRow };
