function saveFile(data, type, name) {
  Logger.log(data)
  Logger.log(type)
  Logger.log(name)

  try {
    var blob = Utilities.newBlob(data, type, name)
    var folder = DriveApp.getFolderById("191u7SMDGHw-o909zCtyZtU1FOs3PiQ-8");
    var newFile = folder.createFile(blob)

  } catch (error) {
      Logger.log(error);
  }

}