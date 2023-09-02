const handlegetItems = (req, res, db) => {
  db.select("*")
    .from("itemtable")
    .then((data) => {
      console.log(data, data[0]);
      return res.json(data);
    })
    .catch((_err) => res.status(400).json("data not fetched"));
};

module.exports = {
  handlegetItems: handlegetItems,
};
