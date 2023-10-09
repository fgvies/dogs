const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogsRoutes");
const temperamentsRouter = require("./temperamentsRoutes")


const router = Router();



// Configurar los routers

router.use("/dogs", dogsRouter )
router.use("/temperaments", temperamentsRouter)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
