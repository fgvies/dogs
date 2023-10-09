export const validateName = (name) => {
  const errors = [];

  if (!name) {
    errors.push("El nombre es requerido");
  } else if (!/^[a-zA-Z\s]{1,25}$/.test(name)) {
    errors.push("Nombre Invalido");
  }

  return errors;
};

export const validateHeight = (minHeight, maxHeight) => {
  const errors = [];

  if (!minHeight && !maxHeight) {
    errors.push("Se requiere al menos una altura");
  } else {
    if (minHeight && (!/^\d+$/.test(minHeight) || parseInt(minHeight) < 1)) {
      errors.push("Altura Invalida");
    }

    if (maxHeight && (!/^\d+$/.test(maxHeight) || parseInt(maxHeight) < 1)) {
      errors.push("Altura Invalida");
    }

    if (minHeight && maxHeight && parseInt(maxHeight) <= parseInt(minHeight)) {
      errors.push("Altura Invalida");
    }
  }

  return errors;
};

export const validateWeight = (minWeight, maxWeight) => {
  const errors = [];

  if (!minWeight && !maxWeight) {
    errors.push("Se requiere al menos un peso");
  } else {
    if (minWeight && (!/^\d+$/.test(minWeight) || parseInt(minWeight) < 1)) {
      errors.push("Peso Invalido");
    }
  // vddddddddddddddddddddddddddddddddddddssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

    if (maxWeight && (!/^\d+$/.test(maxWeight) || parseInt(maxWeight) < 1)) {
      errors.push("Peso Invalido");
    }

    if (minWeight && maxWeight && parseInt(maxWeight) <= parseInt(minWeight)) {
      errors.push("Peso Invalido");
    }
  }

  return errors;
};

export const validateLifespan = (minLifeSpan, maxLifeSpan) => {
  const errors = [];

  if (!minLifeSpan && !maxLifeSpan) {
    errors.push("Se requiere al menos una esperanza de vida");
  } else {
    if (
      minLifeSpan &&
      (!/^\d+$/.test(minLifeSpan) || parseInt(minLifeSpan) < 1)
    ) {
      errors.push("LifeSpan Invalido");
    }

    if (
      maxLifeSpan &&
      (!/^\d+$/.test(maxLifeSpan) || parseInt(maxLifeSpan) < 1)
    ) {
      errors.push("LifeSpan Invalido");
    }

    if (
      minLifeSpan &&
      maxLifeSpan &&
      parseInt(maxLifeSpan) <= parseInt(minLifeSpan)
    ) {
      errors.push("LifeSpan Invalido");
    }
  }

  return errors;
};


export const validateImageUrl = (imageUrl) => {
  const errors = [];

  if (imageUrl.trim() === "") {
    errors.push("La URL de la imagen es obligatoria.");
  } else {
    const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    if (!urlPattern.test(imageUrl)) {
      errors.push("La URL de la imagen no es válida.");
    }
  }

  return errors;
};
