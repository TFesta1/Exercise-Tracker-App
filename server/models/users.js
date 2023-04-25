//const data = require('../data/products.json');
const { connect, ObjectId } = require('./mongo');

const COLLECTION_NAME = 'users';

const data = [
    {
        "name": "John Doe",
        "email": "john@doe.com",
        "password": "123456",
        "photo": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
        "role": "admin",
    },
    {
        "name": "Jane Doe",
        "email": "jane@doe.com",
        "password": "123456",
        "photo": "https://robohash.org/autemquidemvoluptatem.png?size=50x50&set=set1",
        "role": "user",
    },
]

async function collection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getAll(page = 1, pageSize = 30) {
    const col = await collection();
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments();
    return { items, total };
}

async function getById(id) {
    const col = await collection();
    const item = await col.findOne({ _id: new ObjectId(id) });
    return item;
}

async function add(item) {
    const col = await collection();

    const result = await col.insertOne(item);

    item._id = result.insertedId;
    return item;
}

async function update(item) {

    console.log(item);
    const col = await collection();
    const result = await col.findOneAndUpdate(
        { _id: new ObjectId(item.id) },
        { $set: item },
        { returnDocument: 'after' }
    );

    return result.value;
}

async function deleteItem(id) {
    const col = await collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

async function search(searchTerm, page = 1, pageSize = 30) {
    const col = await collection();
    const query = {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
        ]
    };

    const items = await col.find(query).skip((page - 1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(query);
    return { items, total };
}

async function seed() {
    const col = await collection();
    const result = await col.insertMany(data);
    return result.insertedCount;
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteItem,
    search,
    seed,
};