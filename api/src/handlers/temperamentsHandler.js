
const {getTemperamentsController}= require("../controllers/temperamentsController")

const getTemperamentsHandler = async (req, res) => {
  try {
    const results = await getTemperamentsController();
    return res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTemperamentsHandler };
