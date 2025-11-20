import { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia',
    excerpt: 'Discover off-the-beaten-path destinations that will take your breath away.',
    image: '/images/bali-retreat.jpg',
    date: 'Nov 15, 2024',
    category: 'Destinations',
    author: 'Sarah Johnson',
    readTime: '8 min read',
    content: `
      <p>Southeast Asia is a treasure trove of incredible destinations, but some of the most magical places remain hidden from the typical tourist trail. In this comprehensive guide, we'll explore ten extraordinary locations that offer authentic experiences and breathtaking beauty.</p>
      
      <h3>1. Koh Rong Sanloem, Cambodia</h3>
      <p>While its sister island Koh Rong attracts party-goers, Koh Rong Sanloem offers pristine beaches and bioluminescent plankton. The island's Saracen Bay is perfect for those seeking tranquility, with crystal-clear waters and stunning sunsets.</p>
      
      <h3>2. Pai, Thailand</h3>
      <p>Nestled in the mountains of northern Thailand, Pai is a bohemian paradise. With its hot springs, waterfalls, and laid-back atmosphere, it's the perfect escape from the bustling cities. Don't miss the Pai Canyon at sunset!</p>
      
      <h3>3. Nusa Penida, Indonesia</h3>
      <p>Just off the coast of Bali, Nusa Penida remains relatively untouched by mass tourism. The island boasts dramatic cliffs, hidden beaches like Kelingking Beach, and incredible snorkeling spots with manta rays.</p>
      
      <h3>4. Luang Prabang, Laos</h3>
      <p>This UNESCO World Heritage city combines French colonial architecture with traditional Lao culture. Wake up early to witness the daily alms-giving ceremony and explore the stunning Kuang Si Falls nearby.</p>
      
      <h3>5. El Nido, Philippines</h3>
      <p>With its limestone cliffs, hidden lagoons, and pristine beaches, El Nido is a paradise for island hoppers. Take a boat tour to explore the Bacuit Archipelago's secret beaches and snorkeling spots.</p>
      
      <h3>Conclusion</h3>
      <p>These hidden gems offer authentic experiences away from the crowds. Remember to travel responsibly, respect local cultures, and leave no trace. Your adventure awaits in Southeast Asia's best-kept secrets!</p>
    `
  },
  {
    id: 2,
    title: 'Sustainable Travel: A Complete Guide',
    excerpt: 'Learn how to minimize your carbon footprint while exploring the world.',
    image: '/images/newzealand-alpine.jpg',
    date: 'Nov 10, 2024',
    category: 'Sustainability',
    author: 'Michael Chen',
    readTime: '12 min read',
    content: `
      <p>As travelers, we have a responsibility to protect the places we visit. Sustainable travel isn't just a trend—it's a necessity for preserving our planet's beauty for future generations. This comprehensive guide will help you travel more consciously.</p>
      
      <h3>Understanding Your Carbon Footprint</h3>
      <p>Every journey has an environmental impact. From flights to accommodations, understanding your carbon footprint is the first step toward sustainable travel. Use carbon calculators to measure your impact and consider offsetting programs.</p>
      
      <h3>Choose Eco-Friendly Transportation</h3>
      <p>When possible, opt for trains over planes, especially for shorter distances. If flying is necessary, choose direct flights and economy class, which has a lower per-person carbon footprint. Consider electric or hybrid rental cars at your destination.</p>
      
      <h3>Support Local Communities</h3>
      <p>Stay in locally-owned accommodations, eat at family-run restaurants, and buy from local artisans. This ensures your money directly benefits the community rather than large corporations.</p>
      
      <h3>Reduce Plastic Waste</h3>
      <p>Bring a reusable water bottle, shopping bag, and utensils. Refuse single-use plastics and choose accommodations that have eliminated plastic amenities. Every small action counts!</p>
      
      <h3>Respect Wildlife and Nature</h3>
      <p>Never feed wild animals, maintain safe distances, and avoid attractions that exploit animals. Choose tour operators committed to conservation and ethical wildlife viewing.</p>
      
      <h3>Travel Slowly</h3>
      <p>Instead of rushing through multiple destinations, spend more time in fewer places. This reduces transportation emissions and allows for deeper cultural immersion.</p>
      
      <h3>Conclusion</h3>
      <p>Sustainable travel is about making conscious choices that benefit both the environment and local communities. Start with small changes and gradually incorporate more sustainable practices into your travels. Together, we can make a difference!</p>
    `
  },
  {
    id: 3,
    title: 'Luxury on a Budget: Tips & Tricks',
    excerpt: 'Experience 5-star travel without breaking the bank.',
    image: '/images/santorini-sunset.jpg',
    date: 'Nov 5, 2024',
    category: 'Travel Tips',
    author: 'Emma Rodriguez',
    readTime: '10 min read',
    content: `
      <p>Who says luxury travel has to drain your bank account? With smart planning and insider knowledge, you can enjoy premium experiences without the premium price tag. Here's how to travel like royalty on a commoner's budget.</p>
      
      <h3>1. Time Your Travel Right</h3>
      <p>Shoulder season is your best friend. Travel just before or after peak season to enjoy better weather, fewer crowds, and significantly lower prices. Luxury hotels often slash rates by 40-60% during these periods.</p>
      
      <h3>2. Leverage Credit Card Points</h3>
      <p>Strategic use of travel credit cards can earn you free flights and hotel stays. Focus on cards with generous sign-up bonuses and transfer partners. Many luxury hotels can be booked using points at a fraction of the cash price.</p>
      
      <h3>3. Book Directly with Hotels</h3>
      <p>While comparison sites are great for research, booking directly often gets you better perks: free breakfast, room upgrades, late checkout, and resort credits. Join hotel loyalty programs—they're free and offer immediate benefits.</p>
      
      <h3>4. Splurge Strategically</h3>
      <p>You don't need luxury everything. Splurge on experiences that matter most to you—maybe a fancy dinner or spa treatment—while saving on others. Stay in a nice hotel but eat street food for lunch.</p>
      
      <h3>5. Use Luxury for Less Platforms</h3>
      <p>Websites like Secret Escapes, Luxury Escapes, and Tablet Hotels offer curated luxury deals at discounted rates. Sign up for their newsletters to catch flash sales and exclusive offers.</p>
      
      <h3>6. Upgrade Your Economy Experience</h3>
      <p>Can't afford business class? Bid for upgrades, use miles for upgrades, or book premium economy. Airport lounge access can be purchased for $30-50, giving you a luxury experience without the business class ticket.</p>
      
      <h3>7. Dine Like a Local VIP</h3>
      <p>Lunch at Michelin-starred restaurants costs a fraction of dinner prices. Many high-end restaurants offer prix-fixe lunch menus that showcase their cuisine at accessible prices.</p>
      
      <h3>Conclusion</h3>
      <p>Luxury travel on a budget is all about smart choices and knowing where to splurge and where to save. With these tips, you can create unforgettable premium experiences without the guilt of overspending. Happy travels!</p>
    `
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setShowDetail(true);
    document.body.classList.add('no-scroll');
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedPost(null);
    document.body.classList.remove('no-scroll');
  };

  return (
    <main>
      <section className="section is-visible">
        <div className="section-heading">
          <p className="eyebrow">Travel insights</p>
          <h2>Stories from the road</h2>
          <p>Expert tips, destination guides, and travel inspiration.</p>
        </div>
        <div className="article-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="article-card">
              <img src={post.image} alt={post.title} />
              <div className="article-card-content">
                <div className="article-card-meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button className="btn btn-link" onClick={() => handleReadMore(post)}>
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog Detail Modal */}
      {showDetail && selectedPost && (
        <div className="blog-modal is-visible">
          <div className="blog-modal__backdrop" onClick={handleCloseDetail}></div>
          <article className="blog-modal__dialog">
            <button className="icon-button blog-modal__close" onClick={handleCloseDetail} aria-label="Close article">
              ×
            </button>
            
            <div className="blog-modal__header">
              <img src={selectedPost.image} alt={selectedPost.title} className="blog-header-image" />
              <div className="blog-header-content">
                <span className="blog-category-badge">{selectedPost.category}</span>
                <h1>{selectedPost.title}</h1>
                <div className="blog-meta">
                  <span className="blog-author">👤 {selectedPost.author}</span>
                  <span className="blog-date">📅 {selectedPost.date}</span>
                  <span className="blog-read-time">⏱️ {selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            <div className="blog-modal__content">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              
              <div className="blog-actions">
                <button className="btn btn-primary" onClick={handleCloseDetail}>
                  ← Back to Blog
                </button>
                <div className="blog-share">
                  <span>Share:</span>
                  <button className="share-btn" aria-label="Share on Facebook">📘</button>
                  <button className="share-btn" aria-label="Share on Twitter">🐦</button>
                  <button className="share-btn" aria-label="Share on LinkedIn">💼</button>
                  <button className="share-btn" aria-label="Copy link">🔗</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
