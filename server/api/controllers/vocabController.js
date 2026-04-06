const moogoose = require('mongoose');
const Vocab = moogoose.model('Vocab');

exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, words) => {
        if (err) res.send(err);
        res.json(words);
    });
};

exports.create_a_word = (req, res) => {
    const new_word = new Vocab(req.body);
    // Create a unique key based on the category and a random number
    if (req.body.category) {
    const prefix = req.body.category.toUpperCase().substring(0, 3); // get first 3 letters of category as prefix
    const randomNum = Math.floor(1000 + Math.random() * 9000); // generate a random 4-digit number
    new_word.key = `${prefix}-${randomNum}`;
    } else {
        new_word.key = `GEN-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    new_word.save((err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};

exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};

exports.update_a_word = (req, res) => {
  // THÊM DÒNG NÀY: Xoá _id ra khỏi cục dữ liệu gửi lên để MongoDB không chửi
  if (req.body._id) {
      delete req.body._id;
  }

  Vocab.findOneAndUpdate({ _id: req.params.wordId }, req.body, { new: true }, (err, word) => {
    if (err) res.send(err);
    res.json(word);
  });
};

exports.delete_a_word = (req, res) => {
    Vocab.findByIdAndRemove(req.params.wordId, (err, word) => {
        if (err) res.send(err);
        res.json({ message: 'Word successfully deleted',
            _id: req.params.wordId
         });
    });
};