const googleTTS = require('google-tts-api');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Letras del abecedario en español
const letras = [
  "a", "be", "ce", "de", "e", "efe", "ge", "hache", "i", "jota", "ka",
  "ele", "eme", "ene", "eñe", "o", "pe", "cu", "erre", "ese", "te", "u",
  "uve", "doble uve", "equis", "y griega", "zeta"
];

// Carpeta de salida
const outputDir = path.join(__dirname, 'letras_mp3');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Función para descargar el MP3
async function descargarMP3(letra) {
  try {
    const url = googleTTS.getAudioUrl(letra, {
      lang: 'es-ES',
      slow: false,
      host: 'https://translate.google.es',
    });

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const filename = letra.replace(/ /g, '_') + '.mp3';
    const filePath = path.join(outputDir, filename);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Generado: ${filename}`);
        resolve();
      });
      writer.on('error', reject);
    });

  } catch (err) {
    console.error(`❌ Error al generar "${letra}":`, err);
  }
}

// Ejecutar para todas las letras
(async () => {
  for (const letra of letras) {
    await descargarMP3(letra);
  }
  console.log('\n🎉 ¡Todos los audios han sido generados!');
})();

