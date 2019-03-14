import Fingerprint2 from 'fingerprintjs2'

function generateIdentification() {
  let identification = localStorage.getItem("identification")
  if(!identification && identification === null) {
    setTimeout(function () {
      Fingerprint2.get(function (components) {
        localStorage.setItem("identification", components[5].value + components[15].value + components[19].value + components[26].value.length + components[27].value);
      })
    },500)
  }
}

export { generateIdentification }