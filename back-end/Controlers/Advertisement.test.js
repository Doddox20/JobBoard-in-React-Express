import assert from 'assert';
import sinon from 'sinon';
import {
  getAllAdvertissment,
  getAdvertisementById,
  getAdvertisementByCom,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} from './Advertisement.js';


const req = {};
const res = {
  status: sinon.stub(),
  json: sinon.stub(),
};


const pool = {
  query: sinon.stub(),
};

describe('Advertisement Controller', () => {
  beforeEach(() => {

    res.status.resetHistory();
    res.json.resetHistory();
    pool.query.resetHistory();
  });

  it('should get all advertisements', async () => {
    pool.query.returns(Promise.resolve([]));

    await getAllAdvertissment(req, res);

    assert(res.status.calledWith(200));
    assert(res.json.calledOnce);
  });

  it('should get an advertisement by ID', async () => {
    req.params = { id: 1 };

    pool.query.returns(Promise.resolve([{ idAd: 1, nomAd: 'Test Ad' }]));

    await getAdvertisementById(req, res);

    assert(res.status.calledWith(200));
    assert(res.json.calledOnce);
  });

});
