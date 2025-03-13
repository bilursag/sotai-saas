import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Comenzando la siembra de plantillas...");
  await prisma.tag.deleteMany();
  await prisma.template.deleteMany();
  console.log("Datos anteriores eliminados");

  const laboralTag = await prisma.tag.create({
    data: { name: "Laboral" },
  });

  const confidencialidadTag = await prisma.tag.create({
    data: { name: "Confidencialidad" },
  });

  const inmobiliarioTag = await prisma.tag.create({
    data: { name: "Inmobiliario" },
  });

  const contratoTag = await prisma.tag.create({
    data: { name: "Contrato" },
  });

  const arrendamientoTag = await prisma.tag.create({
    data: { name: "Arrendamiento" },
  });

  const ndaTag = await prisma.tag.create({
    data: { name: "NDA" },
  });

  console.log("Etiquetas creadas:", {
    laboralTag,
    confidencialidadTag,
    inmobiliarioTag,
    contratoTag,
  });

  const contratoTrabajo = await prisma.template.create({
    data: {
      title: "Contrato de trabajo",
      description:
        "Plantilla estándar para contratos laborales según la legislación vigente",
      content: `CONTRATO DE TRABAJO

En [CIUDAD], a [FECHA], entre:

[NOMBRE EMPRESA], con domicilio en [DIRECCIÓN EMPRESA], CIF [CIF EMPRESA], representada por D./Dña. [NOMBRE REPRESENTANTE], en calidad de [CARGO], en adelante "EL EMPLEADOR", 

y 

D./Dña. [NOMBRE TRABAJADOR], mayor de edad, con RUT [NÚMERO DOCUMENTO], domiciliado/a en [DIRECCIÓN TRABAJADOR], en adelante "EL TRABAJADOR",

Ambas partes, reconociéndose mutuamente la capacidad legal necesaria para contratar y obligarse, han convenido el presente contrato de trabajo, que se regirá por las siguientes cláusulas:

PRIMERA - OBJETO Y CLASIFICACIÓN PROFESIONAL
EL TRABAJADOR prestará sus servicios como [CATEGORÍA/PUESTO], realizando las funciones propias de dicho puesto que principalmente consisten en [DESCRIPCIÓN DE FUNCIONES], con la categoría profesional de [CATEGORÍA] dentro del grupo profesional [GRUPO] según el convenio colectivo aplicable.

SEGUNDA - DURACIÓN Y JORNADA
El presente contrato se concierta con carácter [INDEFINIDO/TEMPORAL] y se extenderá desde el [FECHA INICIO] hasta [INDEFINIDO/FECHA FIN]. 

La jornada de trabajo será de [NÚMERO] horas semanales, prestadas de [DÍA] a [DÍA], en horario de [HORA INICIO] a [HORA FIN], con los descansos establecidos legal o convencionalmente.

TERCERA - PERÍODO DE PRUEBA
Se establece un período de prueba de [DURACIÓN] meses, durante el cual cualquiera de las partes podrá dar por finalizada la relación laboral, sin derecho a indemnización alguna.

CUARTA - RETRIBUCIÓN
EL TRABAJADOR percibirá una retribución total de [CANTIDAD] pesos brutos [PERIODICIDAD: mensuales/anuales], con la siguiente estructura salarial:
- Salario Base: [CANTIDAD] pesos.
- Complementos: [DETALLAR COMPLEMENTOS] por valor de [CANTIDAD] pesos.

El pago se realizará mensualmente, mediante transferencia bancaria a la cuenta designada por EL TRABAJADOR.

QUINTA - VACACIONES
EL TRABAJADOR tendrá derecho a disfrutar [NÚMERO] días naturales de vacaciones anuales retribuidas, o la parte proporcional que corresponda en función del tiempo trabajado.

SEXTA - CONVENIO COLECTIVO
En lo no previsto en este contrato se estará a lo dispuesto en la legislación vigente que resulte de aplicación, y particularmente, el Estatuto de los Trabajadores y el convenio colectivo de [NOMBRE DEL CONVENIO].

SÉPTIMA - PROTECCIÓN DE DATOS
EL TRABAJADOR consiente expresamente que sus datos personales sean incorporados a los ficheros de la empresa para cumplir con las finalidades propias de la relación laboral, la gestión de recursos humanos y cumplimiento de obligaciones legales.

Y para que conste, se extiende este contrato por triplicado en el lugar y fecha indicados, firmando las partes interesadas.


EL EMPLEADOR                                          EL TRABAJADOR


__________________                                __________________
`,
      category: "laboral",
      usageCount: 0,
      tags: {
        connect: [{ id: laboralTag.id }, { id: contratoTag.id }],
      },
    },
  });

  const ndaTemplate = await prisma.template.create({
    data: {
      title: "Acuerdo de Confidencialidad (NDA)",
      description:
        "Documento estándar para proteger información confidencial compartida entre partes",
      content: `ACUERDO DE CONFIDENCIALIDAD

En [CIUDAD], a [FECHA]

REUNIDOS

De una parte, [NOMBRE PARTE DIVULGADORA], con [CIF/NIF] [NÚMERO], y domicilio en [DIRECCIÓN], representada por D./Dña. [NOMBRE REPRESENTANTE], en calidad de [CARGO], en adelante, "PARTE DIVULGADORA".

Y de otra parte, [NOMBRE PARTE RECEPTORA], con [CIF/NIF] [NÚMERO], y domicilio en [DIRECCIÓN], representada por D./Dña. [NOMBRE REPRESENTANTE], en calidad de [CARGO], en adelante, "PARTE RECEPTORA".

Ambas partes (en adelante, "las Partes") se reconocen mutua y recíprocamente la capacidad legal necesaria para la firma del presente Acuerdo, y

EXPONEN

I. Que ambas Partes están interesadas en iniciar una relación de negocios/colaboración en relación con [DESCRIBIR PROYECTO O RELACIÓN].

II. Que durante el proceso es posible que las Partes intercambien información confidencial que desean proteger.

Por lo tanto, las Partes convienen en celebrar el presente ACUERDO DE CONFIDENCIALIDAD (en adelante, "el Acuerdo"), con sujeción a las siguientes:

CLÁUSULAS

PRIMERA - OBJETO
El objeto del presente Acuerdo es fijar los términos y condiciones bajo los cuales las Partes mantendrán la confidencialidad de la información suministrada entre ellas.

SEGUNDA - DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL
A los efectos del presente Acuerdo, se considerará Información Confidencial toda aquella información, ya sea oral, escrita o en soporte electrónico o en cualquier otro soporte, que sea suministrada por una Parte (la "Parte Divulgadora") a la otra (la "Parte Receptora") durante el desarrollo de la relación entre ambas, incluyendo, sin carácter limitativo:
- Información técnica, financiera y comercial
- Planes de negocio y marketing
- Know-how, diseños, fórmulas e ideas
- Software, procesos y métodos de trabajo
- Cualquier otro tipo de información que se designe como confidencial

TERCERA - OBLIGACIONES DE LAS PARTES
La Parte Receptora se compromete a:
1. Mantener la confidencialidad de la Información Confidencial y no revelarla a ninguna persona, empresa o entidad.
2. Utilizar la Información Confidencial únicamente para el propósito establecido en este Acuerdo.
3. Restringir el acceso a la Información Confidencial a aquellos empleados, agentes o representantes que necesiten conocerla para el propósito establecido.
4. Asegurarse de que cualquier persona que acceda a la Información Confidencial conozca las obligaciones establecidas en este Acuerdo.

CUARTA - EXCEPCIONES
Las obligaciones de confidencialidad no se aplicarán a información que:
1. Sea o se convierta en información de dominio público por causa distinta al incumplimiento de la Parte Receptora.
2. Estuviera en posesión legítima de la Parte Receptora antes de recibirla de la Parte Divulgadora.
3. Sea recibida legítimamente por la Parte Receptora de un tercero sin restricciones.
4. Sea desarrollada independientemente por la Parte Receptora sin utilizar Información Confidencial.
5. Deba ser divulgada por imperativo legal o por orden judicial, siempre que la Parte Receptora notifique inmediatamente a la Parte Divulgadora.

QUINTA - DURACIÓN
Las obligaciones de confidencialidad establecidas en el presente Acuerdo permanecerán en vigor durante [NÚMERO] años desde la fecha de firma del presente documento.

SEXTA - DEVOLUCIÓN DE INFORMACIÓN
A petición de la Parte Divulgadora, la Parte Receptora devolverá o destruirá toda la Información Confidencial recibida en formato tangible, así como cualquier copia o extracto de la misma.

SÉPTIMA - LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente Acuerdo se regirá e interpretará de acuerdo con las leyes de [PAÍS] y cualquier disputa que surja en relación con este Acuerdo será sometida a la jurisdicción exclusiva de los tribunales de [CIUDAD].

Y en prueba de conformidad, ambas Partes firman el presente Acuerdo, por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento.


PARTE DIVULGADORA                                      PARTE RECEPTORA


__________________                                   __________________
`,
      category: "corporativo",
      usageCount: 0,
      tags: {
        connect: [{ id: confidencialidadTag.id }, { id: ndaTag.id }],
      },
    },
  });

  const contratoArrendamiento = await prisma.template.create({
    data: {
      title: "Contrato de Arrendamiento",
      description:
        "Contrato para el alquiler de viviendas adaptado a la legislación actual",
      content: `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En [CIUDAD], a [FECHA]

REUNIDOS

De una parte, como ARRENDADOR: D./Dña. [NOMBRE ARRENDADOR], mayor de edad, con DNI [NÚMERO DNI], y con domicilio en [DIRECCIÓN ARRENDADOR].

Y de otra parte, como ARRENDATARIO: D./Dña. [NOMBRE ARRENDATARIO], mayor de edad, con DNI [NÚMERO DNI], y con domicilio a efectos de notificaciones en la vivienda objeto de este contrato.

Ambas partes tienen y se reconocen capacidad legal para la firma del presente contrato, y a tal efecto:

EXPONEN

I. Que el ARRENDADOR es propietario de la vivienda sita en [DIRECCIÓN COMPLETA], con referencia catastral [REFERENCIA CATASTRAL].

II. Que el ARRENDATARIO está interesado en el arrendamiento de dicha vivienda para destinarla a su vivienda habitual y permanente.

III. Que ambas partes han acordado celebrar el presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA, con sujeción a las siguientes:

CLÁUSULAS

PRIMERA - OBJETO DEL CONTRATO
El ARRENDADOR cede en arrendamiento al ARRENDATARIO, que acepta, la vivienda descrita en el Expositivo I de este contrato, incluyendo los muebles y enseres que se detallan en el inventario anexo a este contrato.

SEGUNDA - DURACIÓN DEL CONTRATO
El arrendamiento tendrá una duración de [NÚMERO] años, comenzando su vigencia el día [FECHA INICIO] y concluyendo el día [FECHA FIN].

Al finalizar el plazo pactado, si ninguna de las partes notifica a la otra, al menos con treinta días de antelación a la fecha de terminación, su voluntad de no renovarlo, el contrato se prorrogará por plazos anuales hasta un máximo de [NÚMERO] años adicionales.

TERCERA - RENTA
La renta anual será de [CANTIDAD EN LETRA] pesos ([CANTIDAD EN NÚMEROS] €), pagaderos en mensualidades de [CANTIDAD MENSUAL EN LETRA] pesos ([CANTIDAD MENSUAL EN NÚMEROS] €).

El pago se efectuará dentro de los primeros siete días de cada mes, mediante transferencia bancaria a la cuenta titularidad del ARRENDADOR nº [NÚMERO DE CUENTA IBAN].

La renta se actualizará anualmente, en la fecha en que se cumpla cada año de vigencia del contrato, aplicando a la renta correspondiente a la anualidad anterior la variación porcentual experimentada por el Índice de Precios al Consumo (IPC) en los doce meses inmediatamente anteriores a la fecha de actualización.

CUARTA - FIANZA
A la firma del presente contrato el ARRENDATARIO hace entrega al ARRENDADOR de la cantidad de [CANTIDAD EN LETRA] pesos ([CANTIDAD EN NÚMEROS] €), equivalente a una mensualidad de renta, en concepto de fianza legal.

El importe de la fianza será depositado en el organismo correspondiente de la Comunidad Autónoma donde se ubica la vivienda, de acuerdo con la normativa vigente.

La fianza será devuelta al ARRENDATARIO a la finalización del arrendamiento, una vez comprobado el buen estado de la vivienda y el cumplimiento por el ARRENDATARIO de todas sus obligaciones contractuales.

QUINTA - GASTOS GENERALES Y SERVICIOS INDIVIDUALES
Los gastos generales para el adecuado sostenimiento del inmueble, sus servicios, tributos, cargas y responsabilidades que no sean susceptibles de individualización corresponderán al ARRENDADOR.

Los gastos por servicios con que cuente la finca que se individualicen mediante aparatos contadores (agua, electricidad, gas, etc.) serán por cuenta del ARRENDATARIO.

SEXTA - CONSERVACIÓN DE LA VIVIENDA
El ARRENDADOR está obligado a realizar, sin derecho a elevar por ello la renta, todas las reparaciones que sean necesarias para conservar la vivienda en condiciones de habitabilidad para servir al uso convenido, salvo cuando el deterioro sea imputable al ARRENDATARIO.

El ARRENDATARIO deberá comunicar al ARRENDADOR, a la mayor brevedad posible, la necesidad de las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad.

SÉPTIMA - OBRAS
El ARRENDATARIO no podrá realizar sin el consentimiento expreso del ARRENDADOR, manifestado por escrito, obras que modifiquen la configuración de la vivienda o de sus accesorios, o que provoquen una disminución en la estabilidad o seguridad de la misma.

OCTAVA - CESIÓN Y SUBARRIENDO
El ARRENDATARIO no podrá ceder el contrato ni subarrendar la vivienda sin el consentimiento expreso del ARRENDADOR, manifestado por escrito.

NOVENA - DERECHO DE ADQUISICIÓN PREFERENTE
En caso de venta de la vivienda arrendada, el ARRENDATARIO tendrá derecho de adquisición preferente sobre la misma, en los términos establecidos en el artículo 25 de la Ley de Arrendamientos Urbanos.

DÉCIMA - LEGISLACIÓN APLICABLE
En lo no previsto en el presente contrato, será de aplicación lo dispuesto en la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos, en el Código Civil y en la normativa sectorial complementaria.

Y en prueba de conformidad, las partes firman el presente contrato en duplicado ejemplar, en el lugar y fecha indicados en el encabezamiento.


EL ARRENDADOR                                          EL ARRENDATARIO


__________________                                   __________________
`,
      category: "inmobiliario",
      usageCount: 0,
      tags: {
        connect: [
          { id: inmobiliarioTag.id },
          { id: contratoTag.id },
          { id: arrendamientoTag.id },
        ],
      },
    },
  });

  console.log("Plantillas creadas:", {
    contratoTrabajo: contratoTrabajo.id,
    ndaTemplate: ndaTemplate.id,
    contratoArrendamiento: contratoArrendamiento.id,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
