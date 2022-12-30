const { response } = require('express');


/**
 *
 * @param {*} req
 * @param {*} res
 */
const getTodo = async ( req, res = response ) => {
  
  const search = req.params.search;

  res.json({
    ok: true,
    msg: 'getTodo',
    search,
  });
};



module.exports = { getTodo, };