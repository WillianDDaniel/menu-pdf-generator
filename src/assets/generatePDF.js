import { getImage } from '../assets/imageStore';

export async function generatePDF() {
  let categories = JSON.parse(localStorage.getItem('categories')) || [];
  let storedProducts = JSON.parse(localStorage.getItem('items')) || [];
  let restaurant = JSON.parse(localStorage.getItem('restaurant')) || {};

  const products = await Promise.all(
    storedProducts.map(async item => {
      const blob = await getImage(item.id);
      if (blob) {
        item.image = URL.createObjectURL(blob);
      }
      return item;
    }),
  );

  const restaurantName = restaurant.name || 'Restaurante';
  const restaurantPhone = restaurant.phone || '';
  const restaurantAddress = restaurant.address || '';
  const logoBase64 = restaurant.logo || null;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let yPosition = 25;

  doc.setFillColor(45, 55, 72);
  doc.rect(0, 0, 210, 50, 'F');

  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'JPEG', 10, 10, 30, 30);
    } catch (e) {
      console.log('Erro ao adicionar logo:', e);
    }
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.text(restaurantName, logoBase64 ? 55 : 25, 20);

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  let contactY = 30;

  if (restaurantPhone) {
    doc.text(`Telefone: ${restaurantPhone}`, logoBase64 ? 55 : 25, contactY);
    contactY += 5;
  }

  if (restaurantAddress) {
    doc.text(restaurantAddress, logoBase64 ? 55 : 25, contactY);
  }

  yPosition = 60;
  doc.setTextColor(0, 0, 0);

  categories.forEach(category => {
    const categoryProducts = products.filter(p => p.categoryId === category.id);

    if (categoryProducts.length > 0) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 25;
      }

      doc.setFillColor(248, 249, 250);
      doc.rect(0, yPosition - 5, 210, 20, 'F');

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(33, 37, 41);
      doc.text(category.name.toUpperCase(), 20, yPosition + 5);
      yPosition += 10;

      if (category.description) {
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        doc.setTextColor(108, 117, 125);
        doc.text(category.description, 20, yPosition);
      }

      yPosition += 10;

      let currentColumn = 0;
      const columnWidth = 97.5;
      const leftColumnX = 5;
      const rightColumnX = 107.5;

      categoryProducts.forEach(product => {
        const isLeftColumn = currentColumn === 0;
        const xPosition = isLeftColumn ? leftColumnX : rightColumnX;

        if (yPosition > 240) {
          doc.addPage();
          yPosition = 25;
          currentColumn = 0;
        }

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(230, 230, 230);
        doc.rect(xPosition, yPosition, columnWidth, 29, 'FD');

        if (product.image && typeof product.image === 'string' && product.image.length > 0) {
          try {
            doc.addImage(product.image, 'JPEG', xPosition + 2, yPosition + 2, 25, 25);
          } catch (e) {
            console.log('Erro ao adicionar imagem do produto:', e);
          }
        }

        const hasImage =
          product.image && typeof product.image === 'string' && product.image.length > 0;
        const contentX = hasImage ? xPosition + 30 : xPosition + 8;
        const contentWidth = hasImage ? 65.5 : 72;

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(33, 37, 41);
        let productName = product.name;
        if (product.size) {
          productName += ` (${product.size})`;
        }

        const nameLines = doc.splitTextToSize(productName, contentWidth);
        const hasMultipleNameLines = nameLines.length > 1;

        // Ajusta posição do título baseado se tem quebra de linha
        const titleY = hasMultipleNameLines ? yPosition + 5 : yPosition + 6;
        doc.text(nameLines, contentX, titleY);

        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(40, 167, 69);
        const price = parseFloat(product.price) || 0;
        doc.text(`R$ ${price.toFixed(2).replace('.', ',')}`, contentX, yPosition + 26);

        if (product.description) {
          doc.setFontSize(8);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(108, 117, 125);
          const descLines = doc.splitTextToSize(product.description, contentWidth);
          const maxDescLines = 3;
          const displayLines = descLines.slice(0, maxDescLines);

          // Ajusta posição da descrição baseado se o título tem quebra de linha
          const descY = hasMultipleNameLines ? yPosition + 14 : yPosition + 13;
          doc.text(displayLines, contentX, descY);
        }

        if (currentColumn === 0) {
          currentColumn = 1;
        } else {
          currentColumn = 0;
          yPosition += 35;
        }
      });

      if (currentColumn === 1) {
        yPosition += 5;
      }

      yPosition += 15;
    }
  });

  try {
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);

    window.open(blobUrl, '_blank');

    const iframe = document.getElementById('pdfPreview');
    if (iframe) {
      iframe.src = blobUrl;
    }
  } catch (e) {
    console.error('Erro ao gerar PDF:', e);
  }
}
