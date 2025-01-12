import { useState, useEffect} from "react";
import axios from "axios";
import ModalsFieldsGames from "../../ModalsFieldsGames/ModalFieldsGames";
import { createField } from "../../../../redux/OwnerFields/fieldsActions";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import s from '../forms.module.css'
import InputGroup from 'react-bootstrap/InputGroup';


export default function BasquetFields() {
  const dispatch = useDispatch()
  const [complexName, setComplexName] = useState([])

  const [newField, setNewField] = useState({
    name: "",
    sport: "basquet",
    available: "",
    pricePerTurn: "",
    durationPerTurn: "",
    description: "",
    capacity: 10,
    start: "",
    end: "", 
    complexId: ''
  });

  const [showModal, setShowModal] = useState(false)

  const [errors, setErrors] = useState({
    complexId: 'Ingrese el complejo al que pertenece la cancha',
    name: "",
    available: "",
    pricePerTurn: "",
    durationPerTurn: "",
    description: "",
    start: "",
    end: ""
  });

  useEffect(() => {
    axios.get('https://falta-uno-1.herokuapp.com/owner/getNameComplex')
    .then((res) => {
        setComplexName(res.data)
    })  
},[])

  const [loading, setLoading] = useState(false)

  const convertirTime = (state) => {
    console.log(state)
    var hour = state.slice(0,2)
    var minutes = state.slice(3,6)
    minutes = minutes/60
    let timeNumber = parseInt(hour) + parseFloat(minutes)
    return timeNumber
  }

  const validator = (field) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
    let validations = {};
    const beNumber = /(^\d{1,10}$)/;
    if (!field.complexId) {
      validations.complexId = "Ingrese el complejo al que pertenece la cancha"
    } else if (!complexName.includes(field.complexId)) {
      validations.complexId = `${field.complexId} no existe`
    }else if (!field.name) {
      validations.name = "Ingrese un nombre"
    } else if (field.name.length > 30) {
      validations.name = "Superó el máximo de caracteres"
    } else if (!field.start) {
      validations.start = "Ingrese el horario de apertura"
    } else if (field.start < 0 || field.start > 24) {
      validations.start = "Ingrese un horario válido"
    } else if ((field.start[3] !== '0' || field.start[4] !== '0') && (field.start[3] !== '3' || field.start[4] !== '0')) {
      console.log('soy error', field.start)
      validations.start = 'Ingrese un horario terminado en 30 o 00'
    } else if (!field.end) {
      validations.end = "Ingrese el horario de cierre"
    } else if (field.end < 0 || field.end > 24) {
      validations.end = "Ingrese un horario válido"
    } else if ((field.end[3] !== '0' || field.end[4] !== '0') && (field.end[3] !== '3' || field.end[4] !== '0')) {
      console.log('soy error', field.start)
      validations.end = 'Ingrese un horario terminado en 30 o 00'
    } else if (!field.pricePerTurn) {
      validations.pricePerTurn = "Ingrese un precio por turno"
    } else if (!beNumber.test(field.pricePerTurn)) {
      validations.pricePerTurn = "Ingrese solo números"
    } else if (!field.durationPerTurn) {
      validations.durationPerTurn = "Ingrese la duración del turno"
    } else if (!field.description) {
      validations.description = "Ingrese una descripción de la cancha"
    } else if (field.description.length > 140) {
      validations.description = "Alcanzó el limite de caracteres"
    } else if (!field.available) {
      validations.available = "Indique si la cancha esta disponible"
    }
    return validations;
  };

  const handleInputChange = (e) => {

    if (e.target.name === "pricePerTurn") {
      setNewField({
        ...newField,
        [e.target.name]: parseInt(e.target.value),
      });
      // }if(e.target.name==="start" || e.target.name==="end" || e.target.name==="durationPerTurn"){
      //   let hour=e.target.value.slice(0,2)
      //   let minutes=e.target.value.slice(3,6)
      //   minutes=minutes/60
      //   let timeNumber=parseInt(hour)+parseFloat(minutes)
      //   setNewField({
      //     ...newField,
      //     [e.target.name]: timeNumber,
      //   })
    }
    else {
      setNewField({
        ...newField,
        [e.target.name]: e.target.value,
      });
      // console.log(validator(e));
      // console.log(e.target.value);
    }
    let errors = validator({ ...newField, [e.target.name]: e.target.value });
    setErrors(errors);

  }


  const handleAvailable = (e) => {
    console.log(e.target.value)
    setNewField({
      ...newField,
      available: e.target.value,
    });
    setErrors({ ...errors, available: "" })

  };

  const uploadImage = async (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    console.log(e.target.files);
    const settings = {
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };
    setLoading(true)

    const respuesta = await axios("https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8", settings)

    setNewField({
      ...newField,
      image: respuesta.data.data.url,
    });
    setLoading(false)
  };

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true)
    dispatch(createField({
      ...newField,
      durationPerTurn: convertirTime(newField.durationPerTurn),
      start: convertirTime(newField.start),
      end: convertirTime(newField.end)

    }));
  }


  return (
    <div className={s.container}>
    <div className={s.headerBasquet}>
      <Link to='/owner/select'>
        <Button className={s.volverbtn}>Volver</Button>
      </Link>
      <div className={s.titleheader}>
      <h3 className={s.titulo}>Basquet</h3>
      </div>

      </div>


      <form onSubmit={(e) => handleModal(e)} /*encType='multipart/form-data'*/>
      <div className={s.contenedor}> 
      <div className='row d-flex justify-content-center align-items-center px-5'>
      <div className='col-md-6 col-sm-12 px-5'>
      <div className={s.input}>
          <h5 className={s.titles}>Nombre del complejo</h5>
          <input
            type="text"
            name="complexId"
            className={s.inputfield}
            value={newField.complexId}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.complexId ? <div className={s.error}>{errors.complexId}</div> : null}
        </div>
        <div className={s.input}>
          <h5 className={s.titles}>Nombre de la cancha</h5>
          <input
            type="text"
            name="name"
            className={s.inputfield}
            value={newField.name}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.name ? <div className={s.error}>{errors.name}</div> : null}
        </div>
        <div className={s.columna}>
                <h5 className={s.titles}>Horario de la cancha</h5>
                <div className={s.contenedorcol}>
                  <div className={s.columnahora}>
                    <p className={s.subtitle} >Apertura</p>
                    <input className={s.inputhorario} placeholder="Apertura" name="start" type="time" onChange={(e) => handleInputChange(e)} />
                    {errors.start ? <div className={s.error}>{errors.start}</div> : null}
                  </div>
                  <div className={s.columnahora}>
                    <p className={s.subtitle}>Cierre</p>
                    <input className={s.inputhorario} placeholder="Cierre" name="end" type="time" onChange={(e) => handleInputChange(e)} />
                    {errors.end ? <p className={s.error}>{errors.end}</p> : null}
                  </div>
                </div>
              </div>
        <div className={s.precio}>
          <h5 className={s.titles}>Precio por turno</h5>
          <InputGroup className={s.inputprecio}>
                  <InputGroup.Text className={s.inputpesos} >$</InputGroup.Text>
                  <input type="text"
                    className={s.inputfield}
                    id={s.precioinput}
                    name="pricePerTurn"
                    onChange={(e) => handleInputChange(e)}
                  />
                </InputGroup>
          {errors.pricePerTurn ? <div className={s.error}>{errors.pricePerTurn}</div> : null}
        </div>
        </div>
        <div className='col-md-6 col-sm-12 px-5'>
        <div className={s.duration}>
        <h5 className={s.titles}>Duracion por turno</h5>
             <input
                  className={s.inputfield}
                  placeholder="Duración por turno"
                  name="durationPerTurn"
                  type="time"
                  onChange={(e) => handleInputChange(e)} />
          {errors.durationPerTurn ? <div className={s.error}>{errors.durationPerTurn}</div> : null}
        </div>
        <div>
        <h5 className={s.titles}>Descripcion de la cancha</h5>
          <input
            className={s.inputfield}
            type="text"
            name="description"
            value={newField.description}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.description ? <div className={s.error}>{errors.description}</div> : null}
        </div>

        <div>
                <h5 className={s.titles}>¿Está disponible para usar?</h5>
                <div className={s.btnContenedor}>
                {newField.available === "true" ? <button
                    className={s.btnCeleste}
                    type="button"
                    value="true"
                    name="true"
                    variant="outline-secondary"
                    onClick={(e) => handleAvailable(e)}
                  >Disponible</button>
                  : <button
                  className={s.btndisp}
                  type="button"
                  value="true"
                  name="true"
                  variant="outline-secondary"
                  onClick={(e) => handleAvailable(e)}
                >Disponible</button>}
                {
                newField.available === "false" ?
                  <button
                    className={s.btnCeleste}
                    type="button"
                    value="false"
                    name="false"
                    variant="outline-secondary"
                    onClick={(e) => handleAvailable(e)}
                  >No disponible</button> : 
                  <button
                  className={s.btndisp}
                  type="button"
                  value="false"
                  name="false"
                  variant="outline-secondary"
                  onClick={(e) => handleAvailable(e)}
                >No disponible</button>
                  }
                </div>
                {errors.available ? <div className={s.error}>{errors.available}</div> : null}
              </div>
              <div>
                <h5 className={s.titles}>Imagen de la cancha</h5>
                <input
                  type="file"
                  name="image"
                  className={s.fileselect}
                  onChange={uploadImage}
                  accept="image/*" />
                {loading ? <span class={s.loader}></span> : null}
              </div>
        </div>
        </div>
        <div className={s.boton}>
            { !loading &&
              !errors.name &&
              !errors.complexId &&
              !errors.durationPerTurn &&
              !errors.start &&
              !errors.end &&
              !errors.available &&
              !errors.pricePerTurn &&
              !errors.capacity &&
              !errors.description ?
              <button className={s.btnVerde} type="submit" 
              >Siguiente</button> : <button className={s.btnGris} type="submit" disabled >Siguiente</button>
            }
          </div>
        </div>
      </form>
      <ModalsFieldsGames showModal={showModal} setShowModal={setShowModal} setNewField={setNewField} sport={newField.sport} newField={newField} convertirTime={convertirTime} />
    </div>
  )
}
