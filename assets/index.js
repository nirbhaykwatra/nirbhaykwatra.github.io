async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: 49.3292264, lng: -123.0726468 };
    const map = new Map(document.getElementById("map"), {
      zoom: 11,
      center,
      mapId: "4504f8b37365c3d0",
    });

    const sidebar = document.querySelector(".sidebar");
  
    for (const school of schools) {
      const SchoolMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        content: buildContent(school),
        position: school.position,
        title: school.name,
      });
  
      SchoolMarker.addListener("gmp-click", () => {
        toggleHighlight(SchoolMarker, school);
        buildSidebar(SchoolMarker, sidebar, school);
      });
    }

    for (const industry of industryPartners) {
      const IndustryMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        content: buildContent(industry),
        position: industry.position,
        title: industry.name,
      });
  
      IndustryMarker.addListener("gmp-click", () => {
        toggleHighlight(IndustryMarker, industry);
        buildSidebar(IndustryMarker, sidebar, industry);
      });
    }
  }
  
  function toggleHighlight(markerView, institution) {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }
  
  function buildContent(institution) {
    const content = document.createElement("div");

    if (institution.type === "school") {
      content.classList.add("school");
      content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-school" title="school"></i>
          <span class="fa-sr-only">school</span>
      </div>
      <div class="details">
          <div class="name">${institution.name}</div>
          <div class="address">${institution.address}</div>
          <div class="district">${institution.district}</div>
          <div class="requests">
          <div>
            <button>${institution.requests[0]}</button>
            <button>${institution.requests[1]}</button>
          </div>
          </div>
      </div>
      `;
      console.log(`Generated content for school markers.`)
      return content;
    }

    if (institution.type === "industry") {
      content.classList.add("industry");
      content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-industry" title="industry"></i>
          <span class="fa-sr-only">industry</span>
      </div>
      <div class="details">
          <div class="name">${institution.name}</div>
          <div class="address">${institution.address}</div>
      </div>
      `;
      console.log(`Generated content for industry markers.`)
      return content;
    }
  }

  function buildSidebar(markerView, sidebar, institution) {

    if (markerView.content.classList.contains("highlight")) {
      sidebar.innerHTML = `
      <div class="${institution.type}-sidebar-details">
        <div class="name">
          <h2>${institution.name}</h2>
        </div>
        <div class="name">
          <h2>${institution.name}</h2>
        </div>
      </div>
      `;
    } else {
      sidebar.innerHTML = ``;
    }
  }

  const schools = [
    {
      name: "Capilano Elementary School",
      type: "school",
      address: "1230 20th St W, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3280176,
        lng: -123.1087725
      }
    },
    {
      name: "Highlands Elementary School",
      type: "school",
      address: "3150 Colwood Dr, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3384867,
        lng: -123.0975259
      }
    },
    {
      name: "Larson Elementary School",
      type: "school",
      address: "2605 Larson Rd, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3333691,
        lng: -123.085248
      }
    },
    {
      name: "Westview Elementary School",
      type: "school",
      address: "641 17th Street West, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3238414,
        lng: -123.0894738
      }
    }
  ]

  const industryPartners = [
    {
      name: "Elk Valley Resources",
      type: "industry",
      address: "565 Michel Creek Rd, Sparwood, BC",
      programs: ["Program 1"],
      position: {
        lat: 49.743664238353965,
        lng: -114.8768418788194
      }
    },
    {
      name: "BC Wildlife Federation",
      type: "industry",
      address: "9706 188 St, Surrey, BC",
      programs: ["Program 1"],
      position: {
        lat: 49.178792439098864,
        lng: -122.70057571001746

      }
    },
    {
      name: "Entuitive Consulting",
      type: "industry",
      address: "1075 W Georgia St Suite 1020, Vancouver, BC",
      programs: ["Program 1"],
      position: {
        lat: 49.285945657851165,
        lng: -123.12216791846
      }
    },
    {
      name: "Makers Making Change",
      type: "industry",
      address: "3999 Henning Dr #400, Burnaby, BC",
      programs: ["Program 1"],
      position: {
        lat: 49.2656145749895,
        lng: -123.01496378746197
      }
    },
    {
      name: "Microsoft",
      type: "industry",
      address: "725 Granville St Suite 700 Vancouver, BC",
      programs: ["Program 1"],
      position: {
        lat: 49.282238504262544, 
        lng: -123.11960517823994
      }
    }
  ]
  
  initMap();