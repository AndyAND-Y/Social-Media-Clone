function formPreviewSetup() {
    const inputs = [["title", "Title"], ["name", "This is {Pet's name}"], ["mood", "."], ["owner", "."], ["animal", ""], ["description", "Description"]]; 
    /*
        to be modified
    */

    inputs.forEach(e => {

        const target = e[0];
        const defvalue = e[1];

        const tag = document.getElementById(`${target}Input`);

        tag.onkeyup = () => {
            const add = getAdd(tag);
            const preview = document.getElementById(`${target}Preview`);
            preview.innerText = add;
        }
        tag.onkeypress = () => {
            const add = getAdd(tag);
            const preview = document.getElementById(`${target}Preview`);
            preview.innerText = add;
        }

    });

    function getAdd(tag) {
        const target = tag.name;
        const value = tag.value;
        let add = "";
        if (target === "name") {
            add = "This is ";
            if (value === "") {
                add += "{Pet's name} ";
            }
            else {
                add = add + value + " ";
            }
        }
        else if (target === "mood") {
            add = ".";
            if (value !== "") {
                add = ` and now is felling ${value}.`;
                add = " " + add;
            }
        }
        else if (target === "title") {
            add = "Title";

            if (value !== "") {
                add = value;
            }

        }
        else if (target === "owner") {
            add = ".";
            if (value !== "") {
                add = ` and it's owner is ${value}.`;
            }
        }
        else if (target === "animal") {
            add = `It is a ${value} `;
        }
        else if (target === "description") {
            if (value !== "") add = value;
            else add = "Description";
        }
        return add;
    }
}