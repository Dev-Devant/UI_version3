document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('section');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const main = document.querySelector('main');

    let currentSection = 1;

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionNumber = parseInt(this.getAttribute('data-section'));
            if (sectionNumber !== currentSection) {
                showSection(sectionNumber);
            }
        });
    });

    toggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('expanded');
    });

    function showSection(sectionNumber) {
        const previousSection = document.getElementById(`section${currentSection}`);
        const nextSection = document.getElementById(`section${sectionNumber}`);

        if (sectionNumber > currentSection) {
            // Sliding up
            previousSection.classList.add('slide-up');
            nextSection.classList.add('slide-down');
        } else {
            // Sliding down
            previousSection.classList.add('slide-down');
            nextSection.classList.add('slide-up');
        }

        // Trigger reflow to ensure the initial state is applied before transitioning
        nextSection.offsetHeight;

        previousSection.classList.remove('active');
        nextSection.classList.remove('slide-up', 'slide-down');
        nextSection.classList.add('active');

        // Update active button
        navButtons.forEach(button => button.classList.remove('active'));
        const activeButton = document.querySelector(`[data-section="${sectionNumber}"]`);
        activeButton.classList.add('active');

        currentSection = sectionNumber;

        // Clean up classes after animation
        setTimeout(() => {
            previousSection.classList.remove('slide-up', 'slide-down');
        }, 500);
    }
});



function updateHeader() {
    const userNameElement = document.getElementById('userName');
    const userTokensElement = document.getElementById('userTokens');
  
    if (userNameElement && state.user && state.user.name) {
      userNameElement.textContent = state.user.name;
    }
  
    if (userTokensElement && state.user && state.user.tokens !== undefined) {
      userTokensElement.textContent = `${state.user.tokens} tokens`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', updateHeader);