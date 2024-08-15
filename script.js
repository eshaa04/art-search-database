



        document.addEventListener('DOMContentLoaded', function() {
            const checkboxesCollection = document.querySelectorAll('.collection input[type="checkbox"]');
            const checkboxesMedium = document.querySelectorAll('.medium input[type="checkbox"]');
            const checkboxesTypeOf = document.querySelectorAll('.typeof input[type="checkbox"]');
            const cards = document.querySelectorAll('.filterable_cards .card');
            const searchInput = document.getElementById('textInput');

            const allCheckboxes = [...checkboxesCollection, ...checkboxesMedium, ...checkboxesTypeOf];

            allCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    filterCards();
                });
            });

            searchInput.addEventListener('input', function() {
                filterCards();
            });

            function filterCards() {
           
                const selectedCollections = Array.from(checkboxesCollection)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);

                const selectedMediums = Array.from(checkboxesMedium)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);

                const selectedTypeOfs = Array.from(checkboxesTypeOf)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);

                const searchQuery = searchInput.value.trim().toLowerCase();

                console.log({ selectedCollections, selectedMediums, selectedTypeOfs }); // Log for debugging

                
                cards.forEach(card => {
                    const cardCollection = card.getAttribute('data-collection');
                    const cardMedium = card.getAttribute('data-medium');
                    const cardTypeOf = card.getAttribute('data-typeof');
                    const cardNumber = card.getAttribute('data-number').toLowerCase();
                

                    card.classList.add("hide");

                    const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(cardCollection);
                    const matchesMedium = selectedMediums.length === 0 || selectedMediums.includes(cardMedium);
                    const matchesTypeOf = selectedTypeOfs.length === 0 || selectedTypeOfs.includes(cardTypeOf);
                    const matchesSearch = searchQuery === '' || cardNumber === searchQuery;

                    if (matchesCollection && matchesMedium && matchesTypeOf && matchesSearch) {
                        card.classList.remove("hide");
                    } 
                });
            }

        
            filterCards();
        });
