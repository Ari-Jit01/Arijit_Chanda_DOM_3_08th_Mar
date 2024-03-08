async function getUserIP() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }

  async function getGeoInfo(ip) {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();
    return data;
  }

  async function getPostOffices(pincode) {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    return data[0].PostOffice;
  }

  async function displayUserInfo() {
    try {
      const userIP = await getUserIP();
      const geoInfo = await getGeoInfo(userIP);

      const userInfoElement = document.getElementById('user-info');
      userInfoElement.innerHTML = `
        <p><strong>IP Address:</strong> ${userIP}</p>
        <p><strong>Location:</strong> ${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}</p>
      `;

      const mapElement = document.getElementById('map');
      mapElement.innerHTML = `<iframe
        width="100%"
        height="300"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?q=${geoInfo.loc}&key= Need_to_buy_the_Key"
        allowfullscreen>
      </iframe>`;

      const pincode = geoInfo.postal || geoInfo.post;
      const postOffices = await getPostOffices(pincode);

      const postOfficesElement = document.getElementById('post-offices');
      postOfficesElement.innerHTML = '<p><strong>Post Offices in the Area:</strong></p>';

      postOffices.forEach(postOffice => {
        postOfficesElement.innerHTML += `<p>${postOffice.Name}, ${postOffice.District}, ${postOffice.State}</p>`;
      });
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }

  function getData() {
    displayUserInfo();
  }