import { fabric } from 'fabric';

/** custom obecjt to data */
const objectToObject = fabric.Object.prototype.toObject;
fabric.Object.prototype.toObject = function (propertiesToInclude?: string[]) {
  const data = objectToObject.call(this, propertiesToInclude);
  if (data.version) delete data.version;

  return data;
};
/** custon object config */
fabric.Object.prototype.includeDefaultValues = false;

/** custom canvas to data */
const canvasToObject = fabric.Canvas.prototype.toObject;
fabric.Canvas.prototype.toObject = function (propertiesToInclude?: string[]) {
  const data = canvasToObject.call(this, propertiesToInclude);
  if (data.version) delete data.version;
  return data;
};

/** custom canvas config */
fabric.Canvas.prototype.includeDefaultValues = false;
fabric.Canvas.prototype.preserveObjectStacking = true;

export default fabric;
