export function add_loading_row(scope) {

    const loadingrow = document.createElement('div');
    loadingrow.setAttribute('id', 'loadingScreenRow'); 
    loadingrow.innerHTML = `

    <td colspan="100%" style="padding: 0;">
        <div class="loading">
            <div class="neon-pulse">
                <div class="neon-bar"></div>
                <div class="neon-bar"></div>
                <div class="neon-bar"></div>
                <div class="neon-bar"></div>
            </div>
            <h2 class="loading-text">Collecting Bookmaker Data...</h2>
        </div>
    </td>

`;
    const tableBody = scope.querySelector('.mobile-container');
    tableBody.append(loadingrow);

}

// NEED TO NOW SEE IF WIX CAN PROPERLY IMPORT THE FILES, THEN START TAKING DUPLICATE FUNCTIONS AND MOVING OUT TO FILE WHILE WORKING
