import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react'; 
export default function Login() {
  const [displayScreen, setDisplayScreen] = useState(false);
  const router = useRouter();
  const [ruc, setRuc] = useState('');
  const [ci, setCI] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const token = router?.query?.token;
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const toast = useRef(null);
  const [tamanioMaximoArchivo, setTamanioMaximoArchivo] = useState(0);
  const [tipoArchivo, setTipoArchivo] = useState('.pdf');
  const [mostrarAcuerdoConfidencialidad, setMostrarAcuerdoConfidencialidad] = useState(false);
  const [action, setAction] = useState('login');
  const [isValidToken, setIsValidToken] = useState(true);
  const [checked, setChecked] = useState(false);
  const [tipoEntidadSeleccionada, setTipoEntidadSeleccionada] = useState(0);
  const [archivoSubido, setArchivoCargado] = useState(false);
  const [codidoUsuario, setCodidoUsuario] = useState(null);
  const fileUploadRef = useRef(null);
  const [documentoacuerdo, setDocumentoacuerdo] = useState(null);
  const [parametosPlantillaAcuerdo, setParametosPlantillaAcuerdo] = useState(null);
  const [access_tokenAcuerdo, setAccess_tokenAcuerdo] = useState(null);

  const [administradorTecnico, setAdministradorTecnico] = useState(false);
 const opTipoEntidad=[{name:"Empresa"},{name:"Cliente"},]


 const Loguear =()=>{
  if(tipoEntidadSeleccionada==0){
    
   
      toast.current.show({severity:'error', summary: 'Error al Ingresar', detail:'Debe Seleccionar un Tipo de Usuario', life: 3000});
    
  }else{

    sessionStorage.setItem('usuario', tipoEntidadSeleccionada?.name);
    console.log("name", tipoEntidadSeleccionada?.name)
    router.push(
      {
        pathname: '/frontend/index',
       // query: { name:tipoEntidadSeleccionada?.name},
      },
      '../../frontend/index',
    );
   // window.location.href="../../frontend/catalogoProductos"
   }
   
 }

  return (
    <>
      
      <Head>
        <title>Login :: Inicio de Sesión</title>
      </Head>
      <Toast ref={toast} />
      <div className="surface-200 flex h-screen grid grid-nogutter surface-200">
        <div className="hidden md:inline-flex md:col-6">
          <Image
            src="/Tienda.webp"
            alt="hero-1"
            className="md:ml-auto block md:h-screen"
            width={1920}
            height={1147}
            priority="true"
          />{' '}
        </div>
        
        <div className="flex align-items-center justify-content-center md:col-6 text-left  p-3">
          
          <div className="surface-card p-4 shadow-2 border-round lg:w-6 estiloSNP  ">
          <div className="text-center mt-5">
                <Image alt="Logo Tienda" src="/ShopIcon.svg" width={300} height={115} className="mb-1" priority />
              </div>
            <div className="text-center mb-5 estiloSNP ">
              <div className=" text-2xl  mt-1 mb-2">Tienda Online XYZ</div>
              <div className="estiloSNP">
                <Divider />
              </div>
              
              <div className="font-medium">Inicio de Sesión</div>
            </div>
            

            <div className="mb-3">
              {(() => {
                switch (action) {
                  case 'login':
                    return (
                      <>
                        <label htmlFor="tipoEntidad" className="block text-900 font-medium mb-2">
                          Tipo de Usuario
                        </label>

                        <Dropdown
                          className="flex h-2rem  mb-3 justify-content-center flex align-items-center "
                          value={tipoEntidadSeleccionada}
                          options={opTipoEntidad}
                          onChange={(e) => {
                            setTipoEntidadSeleccionada(e.value);
                          }}
                          optionLabel="name"
                          placeholder="Seleccione un tipo de Usuario"
                          emptyMessage="No hay tipo de usuario"
                        />

                        <div className="flex align-items-center justify-content-between mb-5" />
                        <center>
                        <Button
                          label="Iniciar Sesión"
                          icon="pi pi-sign-in"
                          className="p-button-rounded p-button-info w-12rem"
                         
                          onClick={() => {
                            Loguear()
                          }}
                        />
                      
                        </center>
                         <br />
                     
                      </>
                    );
                }
              })()}
              
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

  