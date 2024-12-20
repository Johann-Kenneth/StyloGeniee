exports.chatbot = async(req, res) => {
    const userMessage = req.body.message;
  
  // Simple response for outfit suggestions - can be enhanced
  let responseText;
  if (userMessage.toLowerCase().includes('formal')) {
    responseText = "For a formal look, consider pairing a blazer with tailored pants.";
  } else if (userMessage.toLowerCase().includes('casual')) {
    responseText = "For a casual look, try jeans with a comfortable T-shirt.";
  }  else if (userMessage.includes('party')) {
    responseText = "For a party, you might want to wear a stylish dress or a smart-casual outfit. Don't forget to accessorize with jewelry or a nice belt.";
  } else if (userMessage.includes('summer')) {
    responseText = "In summer, breathable fabrics are key! Try a short-sleeve shirt and shorts, or a light sundress with sandals.";
  } else if (userMessage.includes('winter')) {
    responseText = "For winter, layer up with a warm coat, a sweater, and a scarf. Pair with boots to keep warm.";
  } else if (userMessage.includes('sport')) {
    responseText = "For sportswear, choose moisture-wicking fabrics. A good pair of athletic shorts or leggings with a comfortable top will do the trick!";
  } else if (userMessage.includes('color')) {
    responseText = "Consider the season and your mood when choosing colors. Pastels are great for spring, while rich jewel tones are perfect for fall.";
  } else if (userMessage.includes('advice')) {
    responseText = "When choosing an outfit, always consider your comfort first. Fit and personal style should be your guiding factors.";
  } else if (userMessage.includes('trendy')) {
    responseText = "For trendy outfits, look for oversized jackets, high-waisted pants, and chunky sneakers.";
  } else if (userMessage.includes('wedding')) {
    responseText = "For weddings, opt for semi-formal attire. A nice dress or a suit works well, along with appropriate accessories.";
  } else {
    responseText = "I'm here to help! Please specify if you're looking for casual, formal, party, or seasonal outfit suggestions.";
  }

  res.json({ reply: responseText });
}
