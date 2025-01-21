let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
  "Roboto",
  
];

//Initial Settings
const initializer = () => {

  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 10; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

// Function to download PDF
// const downloadPDF = () => {
//     const pdf = new jsPDF();
    
//     // Capture the content of the writingArea element using html2canvas
//     html2canvas(writingArea).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
      
//       // Add the captured image to the PDF
//       pdf.addImage(imgData, 'PNG', 10, 10, 180, 240);
      
//       // Save the PDF
//       pdf.save('content.pdf');
//     });
//   };
  
//   // Add event listener to the download button
//   document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
voiceCheck = document.getElementById("voiceCheck");
vc=document.getElementById("vc");

click_to_record.addEventListener('click', function() {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
      
        document.getElementById("text-input").innerHTML = transcript;
        console.log(transcript);
    });

    recognition.addEventListener('start', () => {
        
        voiceCheck.style.backgroundColor = "#FF0000";

        voiceCheck.style.opacity="100";

    });

    recognition.addEventListener('end', () => {
        // Change color to white when speech recognition ends
        voiceCheck.style.color = "#FFFFFF";
        voiceCheck.style.opacity = "0";
    });
  
    if (speech == true) {
        recognition.start();
    }
});

// Initial color setting
voiceCheck.style.opacity = "0";




  

  

const countWords = () => {
  const textInput = document.getElementById("text-input");
  const text = textInput.innerText || textInput.textContent;
  const words = text.trim().split(/\s+/); 
  return (words.length);
};


const updateWordCount = () => {
  const wordCount = countWords();
  document.getElementById("wordCountDisplay").innerText = `${wordCount}`;
};


document.getElementById("text-input").addEventListener("input", updateWordCount);


updateWordCount();
  

window.onload = initializer();






