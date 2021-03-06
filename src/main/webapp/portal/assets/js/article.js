window.onload=function(){
	var thisUrl = window.location.href;
	var start = thisUrl.lastIndexOf("=");
	if(start>0){
		var blogId = thisUrl.substr(start+1);
		//判断是否是数字
		if(!isNaN(blogId)){
			$.ajax({
				type:"post",
				dataType:"json",
				url:host+"/user/blog/article.do",
				data:{"blogId":blogId},
				success:function(result){

					  if(result.status !=0){
					 	alert("参数不合法");
					 	return ;
					 }

					 //解析参数
					 var blogVo = result.data.blogVo;
					 //猜你喜欢
					 var blogVoList = result.data.blogVoList;
					 var tagVoList = result.data.tagVoList;
					 var categoryVoList = result.data.categoryList;
					 //上下篇
					 var lastBlog = result.data.lastBlog;
					 var nextBlog = result.data.nextBlog; 
					 //正文部分初始化
					 initArticle(blogVo);
					 //todo 点赞功能缓存优化 点赞id填充
					 // var span_like_count = $("#span_like_count");
					 // span_like_count.attr("data-id");

					 initialCategory(categoryVoList);
					 initialTagList(tagVoList);
 					 initGuessYouLike(blogVoList);
 					 initialLastAndNext(lastBlog,nextBlog);

			 	  	 //启动标签特效
	 	  	 		var tc = tagcloud(); 
					 	 //计算阅读时间
					 // (jQuery);
			         $('article').readingTime({
                    	wordCountTarget: '.word-count',
                    	readingTimeTarget: '.reading-time',
						wordCountTarget: '.word-count',
						wordsPerMinute: 238,
						round: true,
						lang: 'ch',
                		});
				}
			})
			
		}else {
			alert("参数无效");
			return;
		}
		
	}else{
		alert("无效参数");
		return ;
	}

	$(window).scroll(function () {
		if($(window).scrollTop()>=$(".sidebar").height()){
			//固定猜你喜欢
			 $(".d_postlist").addClass("fixed");
			 $(".sidebar").css("marginTop",-$(".d_postlist").height());
		}else{
			$(".d_postlist").removeClass('fixed');
			$(".sidebar").css("marginTop",0);
		}

	})




}



function initArticle(blogVo){

	var headerArticleInfo = $("#herder_article_info");
	headerArticleInfo.empty();
	var articleContentContainer = $("#div_article_container");
	articleContentContainer.empty();
	var div_tag_bog = $("#div_tag_bog");
	div_tag_bog.empty();

	var content = blogVo.content;
	var author = blogVo.author;
	var categoryId = blogVo.categoryId;
	var categoryName = blogVo.categoryName;
	var createTimeStr = blogVo.createTimeStr;
	var commentCount = blogVo.commentCount;
	var shareCount = blogVo.shareCount;
	var viewCount = blogVo.viewCount;
	var likeCount = blogVo.likeCount;
	var title = blogVo.title;
	var blogId = blogVo.blogId;
	//标签处理
	var tagList=blogVo.tagsList;
	$.each(tagList,function(index,value){
			if(index==0){
					div_tag_bog.append("<i class='fa fa-tags'></i><a href='category.html?tagId="+value.tagId+"' rel='tag'>"+value.tagName+"</a>");
			}else{
				div_tag_bog.append("<a href='category.html?tagId="+value.tagId+"' rel='tag'>这是标签</a>");
			}
	});

	//处理标题
	changeThePageTitle(title);
	//处理菜单选项
	changeMenuItem(categoryId);

	// var heraderChild="<h1 class=article-title><a href=3798.html>"+title+"</a></h1><div id='article-header' class=meta><span id=mute-category class=muted><i class='fa fa-list-alt'></i><a href='"+categoryId+"'>&nbsp;"+categoryName+"</a></span><span class=muted><i class='fa fa-user'></i>&nbsp;"+author+"</span><time class=muted><i class='fa fa-clock-o'></i>&nbsp;"+createTimeStr+"</time><span class=muted style='display:none;'><i class='fa fa-eye'></i>&nbsp;"+viewCount+"</span><span class=muted><i class='fa fa-comments-o'></i><a href='3798.html#comments'>&nbsp;"+commentCount+"&nbsp;评论</a></span></div>";
	var heraderChild="<h1 class=article-title>"+title+"</h1><div id='article-header' class=meta><span id=mute-category class=muted><i class='fa fa-list-alt'></i><a href='category.html?categoryId="+categoryId+"'>&nbsp;"+categoryName+"</a></span><span class=muted><i class='fa fa-user'></i>&nbsp;"+author+"</span><time class=muted><i class='fa fa-clock-o'></i>&nbsp;"+createTimeStr+"</time><span class=muted style='display:none;'><i class='fa fa-eye'></i>&nbsp;"+viewCount+"</span><span class=muted><i class='fa fa-eye'></i>&nbsp;"+viewCount+"&nbsp;</a></span></div>";

	headerArticleInfo.append(heraderChild);

	articleContentContainer.append("<div class='article-content'>"+content+"</div>");
		// articleContentContainer.append("<article><div class='eta'></div><div class='article-content'>"+content+"</div></article>");

	//喜欢次数
	var span_like = $("#span_like");
	span_like.empty().append("<a target='_blank' href='javascript:addLike("+blogId+")'   class='action'><i id='fa_"+blogId+"' status='0' class='fa fa-heart-o'></i><span id='like_count_"+blogId+"' class='count'>"+likeCount+"人喜欢</span>");

	//分享次数
	var shareCountContainer = $("#span_share_count");
	shareCountContainer.empty();
	shareCountContainer.attr("title","累计分享"+shareCount+"次");
	
	shareCountContainer.append(shareCount);

	//浏览次数
	$.ajax({
			type:"post",
			dataType:"json",
			url:host+"/user/blog/add_view.do",
			data:{"blogId":blogId}
		   })
}
function initGuessYouLike(blogVoList){
	var title ;
	var blogId;
	var imgUrl;
	var createTimeStr;
	var commentCount;
	var ulGuessLike =$("#ul_guess_like");
	$.each(blogVoList,function(index,value){
		title = value.title;
		imgUrl = value.imgHost+value.imgUri;
		commentCount = value.commentCount;
		createTimeStr=value.createTimeStr;
		blogId=value.blogId;
		var liChild = "<li><a href='javascript:initNewArticle("+blogId+")' title='"+title+"'><span class=thumbnail><img src='"+imgUrl+"' alt='"+title+"'></span><span class=text>"+title+"</span><span class=muted>"+createTimeStr+"</span><span class=muted style='float: right;'>"+commentCount+"评论</span></a>"
		ulGuessLike.append(liChild);
	})

}

 	function changeThePageTitle(name){
 		var title = $("#title_page_name");
 		title.empty();
 		title.append(name);
 	}

	//标签列表模块
 	function initialTagList(tagList){
	 	var tagscloud = $("#tagscloud");
	 	$.each(tagList,function(index,value){
	 		var tagId = value.tagId;
	 		var tagName = value.tagName;
	 		var tagCount = value.tagCount;
	 		tagscloud.append("<a target='_blank' href='category.html?tagId="+tagId+"' class='tagc"+getRandom(1,6)+"'>"+tagName+'('+tagCount+')'+"</a>");
 		})

 	}
 	

	//获取随机数
	function getRandom(min,max){
		//Math.random()*(上限-下限+1)+下限  
	    return parseInt(Math.random() * (max - min + 1) + min); 
	}



 	function initialCategory(categoryList){
 		var d_category = $("#div_category");
 		d_category.empty();

 		$.each(categoryList,function(index,value){
 			d_category.append("<a class=cate"+getRandom(1,6)+" title='"+value.categoryName+"' href='category.html?categoryId="+value.categoryId+"'>"+value.categoryName+"("+value.blogCount+")</a>");
 		})
 	}

 	function initialLastAndNext(lastBlog,nextBlog){
 		var last_and_next=$("#last_and_next");
 		last_and_next.empty();
 		if(lastBlog!=null){
 			last_and_next.append("<div><strong>上一篇</strong>：<a href='javascript:initNewArticle("+lastBlog.blogId+")'>"+lastBlog.title+"</a></div>");
 		}
 		if(nextBlog!=null){
 			last_and_next.append("<div><strong>下一篇</strong>：<a href='javascript:initNewArticle("+nextBlog.blogId+")'>"+nextBlog.title+"</a></div>");
 		}
 	}

 	// function addLike(){
 	// 	var span_like_count = $("#span_like_count");
 	// 	var count = span_like_count.text();
 	// 	var blogId = span_like_count.attr("data-id");
 	// 	var status = span_like_count.attr("data-status");
 	// 	//todo 如果是没点赞就加1 
 	// 	if(status==0){
 	// 		$("#span_like_icon").removeClass("fa-heart-o").addClass("fa-heart");
 	// 		span_like_count.attr("data-status",1);
 	// 		span_like_count.text(++count);
 	// 		//todo  数据库
 	// 	}else{
		// 	$("#span_like_icon").removeClass("fa-heart").addClass("fa-heart-o");
 	// 		span_like_count.attr("data-status",0);
 	// 		span_like_count.text(--count);
 	// 	}
 	// }

	function changeMenuItem(key){
		if(key<=5){
			$("#menu-item-"+key).addClass("current-menu-item current_page_item").siblings().removeClass("current-menu-item current_page_item");;

		}else{
			$("#menu-item-1").siblings().removeClass("current-menu-item current_page_item").addClass("current-menu-item current_page_item");
 		}
	}
	function initNewArticle(blogId){
		$.ajax({
			type:"post",
			dataType:"json",
			url:host+"/user/blog/loadAt_by_id.do",
			data:{"blogId":blogId},
			success:function(result){
				if(result.status==0){
					var lastBlog = result.data.lastBlog;
					var nextBlog = result.data.nextBlog;
					var blogVo = result.data.blogVo;

					if(blogVo!=null){
						initArticle(blogVo);
					}
					initialLastAndNext(lastBlog,nextBlog);
					goTop();

				}else{
					alert("未知错误!");
				}
				
			}

		})
	}

	function goTop(){
		$('html').animate( { scrollTop: '0px' }, 600 ); 
	}


	function addLike(blogId){
	var icon = $("#fa_"+blogId);
	var status = icon.attr("status");
	var likeCount = $("#like_count_"+blogId);
	$.ajax({
		dataType:"json",
		url:host+"/user/blog/add_like.do",
		data:{blogId,blogId},
		success:function(result){
			 if(result.status==4){
		 	  if(status==0){
			 		icon.attr("status",1);
		 			icon.removeClass("fa-heart-o").addClass("fa-heart");
		 			var likeCountNumber = parseInt(likeCount.text())+1;
		 			likeCount.empty().text(likeCountNumber+"人喜欢");
				 	}else{
			 		icon.attr("status",0);
		 			icon.removeClass("fa-heart").addClass("fa-heart-o");
		 			var likeCountNumber = parseInt(likeCount.text())-1;
		 			likeCount.empty().text(likeCountNumber+"人喜欢");
		 		}
			 }else if(result.status==5){
			 	 	icon.attr("status",0);
		 			icon.removeClass("fa-heart").addClass("fa-heart-o");
		 			var likeCountNumber = parseInt(likeCount.text())-1;
		 			likeCount.empty().text(likeCountNumber+"人喜欢");
		 			alert("您已取消点赞！");
			 }

		}
	})
 	}