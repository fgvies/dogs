import React, { useState, useEffect } from "react";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperamentsDogs, getAllDogs } from "../../redux/actions";
import DogDefault from "../../assets/img/DogDefault2.png";
import {
  validateName,
  validateHeight,
  validateWeight,
  validateLifespan,
  validateImageUrl,
} from "./Validations";

const Form = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    selectedTemperaments: [],
    imageUrl: "",
  });
  console.log(formData);

  useEffect(() => {
    dispatch(getTemperamentsDogs());
  }, [dispatch]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formData.name === "") {
      alert("Por favor, completa los campos antes de enviar el formulario.");
      return;
    }

    if (hasFormErrors()) {
      alert(
        "Existen errores en el formulario. Por favor, corrígelos antes de enviar."
      );
      return;
    }

    const dogData = {
      name: formData.name,
      height: `${formData.minHeight} - ${formData.maxHeight}`,
      weight: `${formData.minWeight} - ${formData.maxWeight}`,
      life_span: `${formData.minLifeSpan} - ${formData.maxLifeSpan}`,
      temperaments: formData.selectedTemperaments.map((temperament) => temperament.id),
      image: formData.imageUrl || DogDefault,
    };
  
    try {
      await dispatch(postDog(dogData));
      alert("El perro se creó exitosamente");
      await dispatch(getAllDogs())

    } catch (error) {
      alert(`Error al crear el perro: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const formErrors = getFormErrors(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: formErrors,
    }));
  };

  const handleTemperamentChange = (event) => {
    const temperamentId = parseInt(event.target.value);
    const selectedTemperament = allTemperaments.find(
      (temperament) => temperament.id === temperamentId
    );
    if (selectedTemperament) {
      if (!formData.selectedTemperaments.includes(selectedTemperament)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          selectedTemperaments: [
            ...prevFormData.selectedTemperaments,
            selectedTemperament,
          ],
        }));
      }
    }
  };

  const handleRemoveTemperament = (temperamentId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedTemperaments: prevFormData.selectedTemperaments.filter(
        (temperament) => temperament.id !== temperamentId
      ),
    }));
  };

  const hasFormErrors = () => {
    for (const errorKey in errors) {
      if (errors[errorKey] && errors[errorKey].length > 0) {
        return true;
      }
    }
    return false;
  };

  const getFormErrors = (name, value, formData) => {
    if (name === "name") {
      return validateName(value);
    } else if (name === "minHeight" || name === "maxHeight") {
      const minHeight = name === "minHeight" ? value : formData.minHeight;
      const maxHeight = name === "maxHeight" ? value : formData.maxHeight;
      return validateHeight(minHeight, maxHeight);
    } else if (name === "minWeight" || name === "maxWeight") {
      const minWeight = name === "minWeight" ? value : formData.minWeight;
      const maxWeight = name === "maxWeight" ? value : formData.maxWeight;
      return validateWeight(minWeight, maxWeight);
    } else if (name === "minLifeSpan" || name === "maxLifeSpan") {
      const minLifeSpan = name === "minLifeSpan" ? value : formData.minLifeSpan;
      const maxLifeSpan = name === "maxLifeSpan" ? value : formData.maxLifeSpan;
      return validateLifespan(minLifeSpan, maxLifeSpan);
    } else if (name === "imageUrl") {
      return validateImageUrl(value);
    }
    return [];
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleFormSubmit} className={style.Form}>
        <div className={style.formInputs}>
          <div>
            <label>
              NOMBRE DE TU MASCOTA
              <input
                className={style.inputName}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Bobby"
              />
            </label>
            {errors.name && errors.name.length > 0 && (
              <span className={style.errors}>{errors.name[0]}</span>
            )}
          </div>
          <div className={style.inputGroup}>
            <div className={style.inputWrapper}>
              <label>
                MAX HEIGHT (cm)
                <input
                  type="text"
                  name="minHeight"
                  value={formData.minHeight}
                  onChange={handleInputChange}
                  placeholder="Ej: 10"
                />
              </label>
              {errors.minHeight && (
                <span className={style.errors}>{errors.minHeight}</span>
              )}
            </div>
            <div className={style.inputWrapper}>
              <label>
                MAX HEIGHT (cm)
                <input
                  type="text"
                  name="maxHeight"
                  value={formData.maxHeight}
                  onChange={handleInputChange}
                  placeholder="Ej: 20"
                />
              </label>
              {errors.maxHeight && (
                <span className={style.errors}>{errors.maxHeight}</span>
              )}
            </div>
          </div>
          <div className={style.inputGroup}>
            <div className={style.inputWrapper}>
              <label>
                MIN WEIGHT (kg)
                <input
                  type="text"
                  name="minWeight"
                  value={formData.minWeight}
                  onChange={handleInputChange}
                  placeholder="Ej: 10"
                />
              </label>
              {errors.minWeight && (
                <span className={style.errors}>{errors.minWeight}</span>
              )}
            </div>
            <div className={style.inputWrapper}>
              <label>
                MAX WEIGHT (kg)
                <input
                  type="text"
                  name="maxWeight"
                  value={formData.maxWeight}
                  onChange={handleInputChange}
                  placeholder="Ej: 20"
                />
              </label>
              {errors.maxWeight && (
                <span className={style.errors}>{errors.maxWeight}</span>
              )}
            </div>
          </div>
          <div className={style.inputGroup}>
            <div className={style.inputWrapper}>
              <label>
                MIN LIFESPAN (years)
                <input
                  type="text"
                  name="minLifeSpan"
                  value={formData.minLifeSpan}
                  onChange={handleInputChange}
                  placeholder="Ej: 10"
                />
              </label>
              {errors.minLifeSpan && (
                <span className={style.errors}>{errors.minLifeSpan}</span>
              )}
            </div>
            <div className={style.inputWrapper}>
              <label>
                MAX LIFESPAN (years)
                <input
                  type="text"
                  name="maxLifeSpan"
                  value={formData.maxLifeSpan}
                  onChange={handleInputChange}
                  placeholder="Ej: 12"
                />
              </label>
              {errors.maxLifeSpan && (
                <div className={style.errors}>{errors.maxLifeSpan}</div>
              )}
            </div>
          </div>
          <div className={style.inputGroup}>
            <div className={style.inputWrapper}>
              <label>
                IMAGEN URL (opcional)
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Ingrese la URL de la imagen del perro"
                />
              </label>
              {errors.imageUrl && (
                <span className={style.errors}>{errors.imageUrl}</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <select id="temperament" onChange={handleTemperamentChange}>
            <option value="">Seleccion de Temperamentos</option>
            {allTemperaments.map((temperament) => (
              <option key={temperament.id} value={temperament.id}>
                {temperament.name}
              </option>
            ))}
          </select>
          <ul className={style["selected-temperaments"]}>
            {formData.selectedTemperaments.map((temperament) => (
              <li key={temperament.id}>
                {temperament.name}
                <button
                  type="button"
                  onClick={() => handleRemoveTemperament(temperament.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className={style.formButton}>
          CREA TU MASCOTA
        </button>
        {errors.general && <p className={style.errors}>{errors.general}</p>}
      </form>
    </div>
  );
};

export default Form;
