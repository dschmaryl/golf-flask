function putPars(pars) {
  for (var i = 1; i < 19; i++) {
    var id = "hole" + i + "_par",
        value = pars[i - 1];
    updateInner(id, value);
  }
}

function getPars(courseName, teeColor) {
  var pars = [];
  for (var i = 1; i < 19; i++) {
    var id = courseName + "_" + teeColor + "_" + i;
    pars.push(getInner(id));
  }
  return pars;
}

function updatePars() {
  var courseName = getSelected("course"),
      teeColor = getSelected("tee_color");
  putPars(getPars(courseName, teeColor));
}
