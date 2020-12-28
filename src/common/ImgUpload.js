import { LinearProgress } from "@material-ui/core";
import React from "react";
import { Button } from "react-bootstrap";

function ImgUpload({ onClick, onChange, progress, disabled }) {
  return (
    <div>
      <input type="file" onChange={onChange} />
      <Button
        variant="dark"
        style={{ marginLeft: 82 }}
        onClick={onClick}
        disabled={disabled}
      >
        Subir archivo
      </Button>
      <div className="py-2">
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
}

export default ImgUpload;

// function ImgUpload() {
//   const [image, setImage] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [imgArray, setImgArray] = useState([]);

//   console.log(imgArray);

//   const handleChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then((url) => {
//             const newList = imgArray.concat(url);
//             setImgArray(newList);
//             db.collection("posts").add({
//               //timestamp: firebase.firestore.FieldValue?.serverTimestamp(),
//               imageUrl: imgArray,
//             });
//             setImage(null);
//             setProgress(0);
//           });
//       }
//     );
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleChange} />
//       <Button variant="dark" style={{ marginLeft: 82 }} onClick={handleUpload}>
//         Subir archivo
//       </Button>
//       <div className="py-2">
//         <LinearProgress variant="determinate" value={progress} />
//       </div>
//     </div>
//   );
// }
