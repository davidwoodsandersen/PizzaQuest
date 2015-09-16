module ApplicationHelper
  def randomized_background_image
  images = ["assets/gif1.gif", "assets/gif2.gif", "assets/gif3.gif", "assets/gif4.gif", "assets/gif5.gif"]
  images[rand(images.size)]
end
end
