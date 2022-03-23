const cloudinary = require("cloudinary").v2;

//config

cloudinary.config({
  cloud_name: "jcross-auto",
  api_key: 576556696241638,
  api_secret: "CjNswMc2juXGhZlaG52AwCZlvc8",
  secure: true,
});

exports.upload = async (req, res) => {
  let result = await cloudinary.v2.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("Deleted Succefully");
  });
};
