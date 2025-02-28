import DOMPurify from 'dompurify'; // Certifique-se de instalar a biblioteca DOMPurify

const formatPlanText = (text) => {
  // Substitui **texto** por <strong>texto</strong>
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Substitui * item por <li>item</li>
  formattedText = formattedText.replace(/\* (.*?)\n/g, "<li>$1</li>");

  // Adiciona <ul> ao redor das listas
  formattedText = formattedText.replace(/<li>.*<\/li>/g, "<ul>$&</ul>");

  // Substitui quebras de linha por <br>
  formattedText = formattedText.replace(/\n/g, "<br>");

  // Sanitiza o texto para evitar XSS
  return DOMPurify.sanitize(formattedText);
};

export default formatPlanText;