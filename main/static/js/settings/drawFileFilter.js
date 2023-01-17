function drafFileFilterTable(domainObjectArray) {

  let myFileObjArray = []
  for (domainInd in domainObjectArray){
    let linkObjArray = domainObjectArray[domainInd].links
    fileIdArray = getFilesIdFromLinks(linkObjArray)
    // console.log(fileIdArray)

  }
  // console.log(fileObj)
}

function getFilesIdFromLinks(linkObjArray) {
  let tempFileIdSet = new Set()
  let myArr = []
  for (i in linkObjArray) {
    let fileObjArray = linkObjArray[i].files

    for (j in fileObjArray) {
      let fileObj = fileObjArray[j]
      if (!tempFileIdSet.has(fileObj.id)) {
        tempFileIdSet.add(fileObj.id)
      }
    }
  }
  tempFileIdSet.forEach(v => myArr.push(v))
  return myArr
}
