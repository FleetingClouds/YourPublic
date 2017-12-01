/*

A SimpleSchema-compatible JSON schema

*/
import { Utils } from 'meteor/vulcan:core';
import Moofies from '../../modules/moofies/collection.js';

const schema = {

  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (moofie, args, context) => {
        return context.Users.findOne({ _id: moofie.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },

  // custom properties

  name: {
    label: 'Name',
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  year: {
    label: 'Year',
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onInsert: moofie => {
      // if no slug has been provided, generate one
      const slug = moofie.slug || Utils.slugify(moofie.name);
      return Utils.getUnusedSlug(Moofies, slug);
    },
    onEdit: (modifier, moofie) => {
      // if slug is changing
      if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== moofie.slug) {
        const slug = modifier.$set.slug;
        return Utils.getUnusedSlug(Moofies, slug);
      }
    }
  },
  review: {
    label: 'Review',
    type: String,
    optional: true,
    control: 'textarea',
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
  },

};

export default schema;