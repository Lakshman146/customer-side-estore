package eStoreProduct.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import eStoreProduct.DAO.WishlistDAO;
import eStoreProduct.model.custCredModel;
import eStoreProduct.utility.ProductStockPrice;

@Controller
public class WishlistController {

	WishlistDAO wishlistdao;

	@Autowired
	public WishlistController(WishlistDAO wishlistimp) {
		wishlistdao = wishlistimp;
	}

	// method to add product to wishlist
	@GetMapping("/addToWishlist")
	@ResponseBody
	public String addToWishlist(@RequestParam(value = "productId", required = true) int productId, Model model,
			HttpSession session) throws NumberFormatException, SQLException {
		custCredModel cust = (custCredModel) session.getAttribute("customer");
		wishlistdao.addToWishlist(productId, cust.getCustId());
		return "Item added to wishlist";
	}

	// method to remove product from wishlist
	@GetMapping("/removeFromWishlist")
	@ResponseBody
	public String removeFromWishlist(@RequestParam(value = "productId", required = true) int productId, Model model,
			HttpSession session) throws NumberFormatException, SQLException {
		custCredModel cust = (custCredModel) session.getAttribute("customer");
		wishlistdao.removeFromWishlist(productId, cust.getCustId());
		return "Item removed from wishlist";
	}

	// method to display the wishlist items
	@RequestMapping("/wishlistItems")
	public String userWishlistItems(Model model, HttpSession session) throws NumberFormatException, SQLException {
		custCredModel cust1 = (custCredModel) session.getAttribute("customer");
		List<ProductStockPrice> products = wishlistdao.getWishlistProds(cust1.getCustId());
		for (ProductStockPrice p : products) {
			System.out.println("In wishlist" + p.getProd_id());
		}

		model.addAttribute("products", products);

		return "wishlistCatalog";
	}

}
