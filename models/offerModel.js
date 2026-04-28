import mongoose from 'mongoose';
import slugify from 'slugify';

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Offer must have a name'],
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Meal must have a price'],
    },
    newprice: {
      type: Number,
      required: [true, 'Offer must have a new price'],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

offerSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
