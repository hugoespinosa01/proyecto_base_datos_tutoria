
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
import Axios from 'axios';
export default function VentanaIndex() {

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

  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
}

const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ display: 'block' }} />;
}

const axios = Axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character/1',
});
axios.defaults.timeout = 180000;

console.log(axios.get(res=>console.log({res})))

  return (
    <div>
      <NavBar />

      <Card
        title=""
        className="mt-3"
      >

<div>
            <div className="card">
                <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }}
                    item={itemTemplate} thumbnail={thumbnailTemplate} circular autoPlay transitionInterval={2000} />
            </div>
        </div>
        
      </Card>
    </div>
  );
}
