
export default function PicValidators(e) {
  if (e.target.files.length === 0) {
    return "Please Upload an Images"

  }
  else if (e.target.files.length === 1) {
    let file = e.target.files[0]
    if (!(["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)))
      return "Invalid Pic Type , Please Uploade a pic of type .jpg , .png, .jpeg,.gif , .webp"
    else if (file.size > 1048576) //1mb me etne byte hote h
      return "Pic is to Heavy , please Uploade an Image Upto 1 MB "
    else
      return ""
  }

}
