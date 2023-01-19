
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { NavBar } from "../../../pages/frontend/navbar";
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import axios from "axios";
import CatalogoProductos from "../ListaProductos";
const baseURL= 'https://rickandmortyapi.com/api/character';
export default function VentanaIndex() {
  const [post, setPost] = useState(null);
  const [imagenes2, setImagenes2] = useState(null);
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost(response.data);
        let valor=response.data.results.length
        let valor2=response.data.results
        setImages(valor2)
        let i=0
        console.log("value",valor)
        let imagenes=[]
        for (i; i<valor;i++){
  
          console.log(i)
          console.log(valor2[i].image)
          imagenes.push(valor2[i].image)
          console.log(imagenes)
          setImagenes2(imagenes)
        }
      });
    }, []);
   
  const [images, setImages] = useState(null)
 // const galleriaService = new PhotoService();

  const responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  const itemTemplate = (imagenes2) => {
    return <img src={imagenes2} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  style={{ width: '100%', display: 'block' }} />;
}

const thumbnailTemplate = (imagenes2) => {
    return <img src={imagenes2} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  style={{ display: 'block' }} />;
}




  return (
    <div   >
      <NavBar />

      <Card
        title=""
        className="mt-3 bg-yellow-200 border-bg-yellow-200  " 
      >
           <div className="flex align-items-center justify-content-center ">
 <Button className=" col-6 transition-colors transition-duration-500  bg-yellow-500 text-color  hover: bg-white text-yellow-500  hover:bg-yellow-500 text-white
    flex align-items-center justify-content-center font-bold border-round cursor-pointer m-2 px-5 py-3"label="Ir a comprar" icon="pi
    pi-shopping-bag"></Button>
           </div>

<div className="bg-bg-yellow-200 border-bg-yellow-200    ">
            <div className="card">
              <div className="flex align-items-center justify-content-center col-12">
              <Card className="col-3" >
                <h1 className="text-6xl">Electrónicos</h1>
                <br/>
              <Galleria className=""value={imagenes2} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '720px' }}
                    item={itemTemplate} circular autoPlay transitionInterval={5000} /> <br/>  <br/>
                    <br/>
              </Card>
              <div className="col-1"></div>
              <Card className="col-3">
              <h1 className="text-6xl">Hogar</h1>  <br/>
              <Galleria className=""value={imagenes2} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '720px' }}
                    item={itemTemplate} circular autoPlay transitionInterval={2000}/>
                      <br/>  <br/>
                      <br/>
              </Card>
              
              <div className="col-1"></div>
                     
              <Card className="col-3 " >
              <h1 className="text-6xl">Computadoras y Accesorios</h1>  <br/>
<Galleria className=""value={imagenes2} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '720px' }}
                    item={itemTemplate} circular autoPlay transitionInterval={3000} />
</Card>  

                    
              </div>
                
            </div>
            <div className="card">
            <Galleria className=""value={imagenes2} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '720px' }}
                    item={itemTemplate} circular autoPlay transitionInterval={3000}  fullScreen/>
                
            </div>

           
        </div>
        
      </Card>
<footer></footer>
    </div>
  );
}
