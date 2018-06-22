let rootUrl = "http://localhost:8080";
$(".zl_drop_down").click(function (e) {
    e.stopPropagation();
    $(".zl_contact_dialog").show();
});

$("body").click(function (e) {
    let elem = e.target||e.srcElement;
    while (elem) {
        if (elem.className==='zl_contact_dialog') {
            return;
        }
        elem = elem.parentNode;
    }
    $(".zl_contact_dialog").hide();
});

function toLearnMore(target) {
    // to show more details
    $(".zl_main_page aside").css({
        "transform":"translateX(130%)"
        /* should hide the aside img..? */
    });
    $(".zl_main_page main >p").css({
        "display":"none"
    });

    $(".zl_main_page main").css({
        "width":"50%",
        "margin":"20px auto",
        "padding":"18px"
    });
    $(".zl_detail").fadeIn();
    $(target).fadeOut();
}
function hideLearnMore() {
    // to hide more details
    $(".zl_main_page aside").css({
        "transform":"translateX(0)"
    });
    $(".zl_main_page main >p").css({
        "display":"block"
    });

    $(".zl_main_page main").css({
        "width":"30%",
        "margin":"100px 0 0 250px",
        "padding":"0"
    });
    $(".zl_detail").fadeOut();
    $(".zl_learn_more").fadeIn();
}

function onSubmit() {
    //get values
    //reset input after be submitted
}

/* about search function */
$(".zl_search_wrapper input").bind("input",function () {
    let value = $(".zl_search_wrapper input").val();
    let root = rootUrl+"/integrate/search";
    let data={
        "q":value
    };
    $.ajax({
        type: 'POST',
        url: root,
        data: data,
        beforeSend:function(){
            console.log("searching ..",value)
        },
        success: function (data) {
            console.log(data);
            $(".zl_search_tips").show();
            if (data.length!==0){
                $.each(data,function (index, ele) {
                    createSearchTips(ele);
                });
            }else{
                createSearchTips("没有相关内容")
            }
        },
    });
});

function createSearchTips(data) {
    let parent = $(".zl_search_tips ul");
    parent.empty("");
    console.log(typeof data);
    if ((typeof (data))!=="string") {
        let tips = "<li><a href="+"./individual_drug_detail.html?id="+data.id+">"+data.drug1Name+"</a></li>";
        parent.append($(tips))
    }else{
        let tips = "<li><a href="+"./individual_drug_detail.html?id="+data.id+"></a></li>";
        parent.append($(tips))
    }

}

/* about internet request .*/
function loadDrugPage(page, size) {
    let root = rootUrl+"/integrate/page";
    /*http://localhost:8080/integrate/page?page=1&size=19*/
    let data={
        "page":page,
        "size":size
    };
    $.ajax({
        type: 'POST',
        url: root,
        data: data,
        beforeSend:function(){
            $(".zl_loader").css("z-index",1);
        },
        success: function (data) {
            $(".zl_loader").css("z-index",-1);
            $(".total_page").text(data.totalPages);
            $(".zl_table tr").each(function (index) {
                if (index!==0&&index!==1){
                    console.log(index);
                    $(this).empty();
                }
            });
            if (data.content.length!==0){
                $.each(data.content,function (index, ele) {
                    createRow(ele);
                });
                //update page controls

            }else{
                alert("当前页数据为空...")
            }
        },
    });
}

function createRow(element) {
    let row = "<tr><td>"+element.id+"</td><td>"+element.fid+"</td><td><a href="+"./individual_drug_detail.html?id="+element.id+">"+element.drug1Name+"</a></td><td>"+element.drug2Name+"</td><td>"+element.conc1+"</td><td>"+element.conc2+"</td><td>"+element.growth+"</td><td>"+element.cellline+"</td><td>"+element.source+"</td></tr>";
    $(".zl_table").append($(row));
}

function gotoPage(num,currentSize) {
    console.log("jump to :",num);
    $(".current").text(num);

    if(num==1){
        $(".pre_page").addClass("disabled");
    }else{
        $(".pre_page").removeClass("disabled");
    }

    let maxPage = $(".total_page").text();

    if(num==maxPage){
        $(".next_page").addClass("disabled");
    }else{
        $(".next_page").removeClass("disabled");
    }

    loadDrugPage(num,currentSize);
}

function getParamFromUrl(parameter) {
    let reg = new RegExp("(^|&)"+ parameter +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null && r[2]!=="")
        return  r[2];
    return null;
}