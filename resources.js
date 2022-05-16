const {
  createResource,
  geometries
} = require('./resource.js');

var resources = {
  google: createResource(),
  gmail: createResource(
    'gmail.com',
    geometries.left
  ),
  gcal: createResource(
    'calendar.google.com',
    geometries.left
  ),
  photos: createResource(
    'photos.google.com',
    geometries.left
  ),
  drive: createResource(
    'drive.google.com',
    geometries.left
  ),
  docs: createResource(
    'docs.google.com',
    geometries.left
  ),
  voice: createResource(
    'voice.google.com',
    geometries.left
  ),
  msg: createResource(
    'messages.google.com/web/conversations',
    geometries.left
  ),
  li: createResource(
    'linkedin.com',
    geometries.left
  )
};

module.exports = { resources };
