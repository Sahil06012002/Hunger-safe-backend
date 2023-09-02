const handleInsertItems = (req, res, db) => {
  const { itemData } = req.body;
  console.log(req.body, "sahil", itemData);
  db("itemtable")
    .insert(itemData)
    .then((id) => {
      res.json({ id: id });
    })
    .catch((_err) => res.status(400).json("email already exit"));
};

module.exports = {
  handleInsertItems: handleInsertItems,
};
