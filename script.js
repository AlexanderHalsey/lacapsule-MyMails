// message divs
var m = $(".message")

// rajouter numero de messages au compteur
var compteur = $("#message-count"); 
// le <strong></strong> tag dedans compteur
compteur.children().text(m.length); 


// creer un listener pour chaque poubelle
// dans chaque message
for (let i=0; i<m.length; i++) {
    // image avec class "bin" dans le div approprié
    let poubelle = m.find(".bin").get(i);
    
    // ajouter un event listener pour ce poubelle
    $(poubelle).click(() => {
        // enlever div parent
        $(poubelle).parent().remove();

        // faire un update au compteur
        var newM = $(".message").filter(function () {
            return $(this).css('display') == "flex";
        });
        compteur.children().text(newM.length);
    });
};

// creer un addEventListener pour le select avec id "contact"
$("#contacts").change(function () {
    if (!["----------", ""].includes($("#contacts").val())) {
        $("#write-message").css("display", "flex");
    } else {
        $("#write-message").css("display", "none");

    };
});

// creer un listener pour le boutton "add"
$("#message-add").click(function () {
    // assurer que le message n'est pas vide
    // et un contact est selectioné parmis les options 
    if ($("#message-input").val().length === 0 || 
        ["----------", ""].includes($("#contacts").val())) {
        return 
    };

    // redonner le displays aux elements qui sont peutetre
    // cachés avec le input "search"
    $(".message").each(function () {
        $(this).css('display', 'flex');
    });

    // creer tout les elements qui apparaiseront dans le
    // nouveau  div qui a le nom de class "message"
    var newMessage = $('<div class="message"></div>');

    // creer un avatar avec le src qui a le numero
    // corresponds a $("#contacts").val()
    var avatar = $(`<img class="avatar" src="img/avatar
-${$("#contacts").val()}.jpg" />`);

    var interDiv = $("<div></div>");

    // $("#contacts options:selected").text() prend le text 
    // de l'option selectioné
    var title = $(`<h6>${$("#contacts option:selected")
        .text()}</h6>`);

    // creer le paragraphe avec le text de l'input
    // - $("#message-input").val() 
    var para = $(`<p>${$("#message-input").val()}</p>`);

    // rajouter le titre et le paragraph dans un div
    $(interDiv).append(title);
    $(interDiv).append(para);

    var poubelle = $('<img class="bin" src="img/trash.png" />');

    // donner un eventListener au nouveau poubelle
    $(poubelle).click(function () {
        $(poubelle).parent().remove();
        // faire un update au compteur
        var newM = $(".message").filter(function () {
            return $(this).css('display') == "flex";
        });
        compteur.children().text(newM.length);
    });

    // rajouter avatar, div et poubelle au nouveau div 
    // avec classe "message"
    $(newMessage).append(avatar);
    $(newMessage).append(interDiv);
    $(newMessage).append(poubelle);

    $(newMessage).css("display", "none");

    // rajouter nouveau div au document
    $('#message-info').after($(newMessage));
    $(newMessage).slideDown(800);

    // faire un update au compteur
    var newM = $(".message");
    compteur.children().text(newM.length);

    // supprimer le contenu de "input"
    $("#message-input").val("");

    // reset les valeurs et displays
    $("#contacts").val("----------");
    $("#write-message").css("display", "none");
});

// creer un listener pour le boutton "search"
$("#search-button").click(() => {
    // chercher les contacts
    $(".message h6").each(function () {
        // si le valeur de l'input search est dans le
        // tableau de contacts le "indexOf" methode nous
        // donnera un numero autre que -1 ce qui veut dire
        // le valeur cherché se trouve dans le string de 
        // "contact" - Comme ça on peut chercher par nom ou par
        // prenom et pas mettre exactement le nom entier pour le 
        // faire egale avec "===". Si le input "search" est vide 
        // cette condition va toujours etre vrai avec un valeur 
        // de 0
        var contact = $(this).text().toLowerCase();
        if (contact.indexOf($("#search-input").val()
            .toLowerCase()) >= 0) {
            $(this).parent().parent().css("display", "flex");
        } else {
            $(this).parent().parent().css("display", "none");
        };
    });
    // 
    $("#search-input").val("");

    // faire un update au compteur
    var newM = $(".message").filter(function () {
        return $(this).css('display') == "flex";
    });
    compteur.children().text(newM.length); 
})
