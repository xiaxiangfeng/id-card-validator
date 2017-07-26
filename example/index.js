import { validator } from '@/idCardValidator'
import area from '@/areaNumber'

const oId = document.getElementById('idCard')
const submit = document.getElementById('submit')
submit.addEventListener('click', function () {
  const id = oId.value
  validator.validate(id, area)
  alert(validator.errorMessage)
  console.log(validator.info)
})
