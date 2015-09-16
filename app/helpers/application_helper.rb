module ApplicationHelper
  def randomized_background_image
  images = ["assets/gif1.gif", "assets/random.jpg", "assets/super_random"]
  images[rand(images.size)]
end
end
