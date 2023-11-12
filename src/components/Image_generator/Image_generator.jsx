import { React, useRef, useState } from 'react'
import './Image_generator.css'
import default_image from '../Assets/default_image.svg'



const Image_generator = () => {

        const [image_url, setImage_url] = useState("/");
        const [imgArray, setImgArray] = useState([]);
        let inputRef = useRef(null);
        const [loading,setLoading] = useState(false);

        const helper = async () =>{
            // if (inputRef.current.value===""){
            //     return 0;
            // }
            setLoading(true);
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: { 
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                        "Content-Type": "application/json" 
                    },
                    method: "POST",
                    body: JSON.stringify({ inputs: inputRef.current.value}),
                }
            );
            const result = await response.blob();
            const final = URL.createObjectURL(result)
	        setImage_url(final)
            setImgArray((prev)=>([...prev, final]));
            setLoading(false);
        }

        const imageGenerator = () => {
            setImgArray([])
            for(let i = 1; i <= 10; i++){
                helper();
            }
        }
        

  return (
    <div className='ai-image-generator'>
        <div className="header">AI Image <span>Generator</span></div>
        <div className="img-loading">
            <div className="image"> <img src={image_url==="/"?default_image:image_url} alt="no image found" /></div>
            <div className="loading">
                <div className={loading? "loading-bar-full":"loading-bar"}></div>
                <div className={loading? "loading-text":"display-none"}>Loading....</div>
            </div>
        </div>
        <div className='search-box'>
            <input type="text" ref={inputRef} className='search-input' placeholder='What you want' />
            <div className="generate-btn" onClick={()=> {imageGenerator()}}>Generate</div>
        </div>
        <div className= "container">
        <div className='panel1'>
        <span className='span1'>Your</span> <span className='span' >  Comic Cadence</span>
        </div>
        <div className="panel">
              
        {imgArray.map((image, index) => (
						<img key={index} src={image} alt="no image found" />
					))}
        </div>
        </div>
        
        
    </div>
    
  )
}

export default Image_generator
