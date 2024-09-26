function About() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow mb-6">About Us</h1>

        {/* Company Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            Our Company
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            Welcome to our flower shop! We have been serving our community with
            fresh, beautiful flowers for over a decade. Our mission is to
            provide our customers with the highest quality floral arrangements
            and exceptional customer service.
          </p>
          <p className="text-lg text-semiBlack">
            Whether you're looking for a bouquet for a special occasion or just
            want to brighten your day, we have a wide variety of flowers to
            choose from. Thank you for choosing us for all your floral needs!
          </p>
        </section>

        {/* About Flowers */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            About Our Flowers
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            Our flowers are sourced from the best growers locally and
            internationally. We take pride in offering a wide range of flowers,
            from classic roses to exotic orchids. Each bloom is carefully
            selected to ensure freshness and longevity.
          </p>
          <p className="text-lg text-semiBlack">
            We also offer personalized floral arrangements to suit any occasion.
            Let us help you create the perfect arrangement for your needs!
          </p>
        </section>

        {/* Company History */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            Our History
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            Our flower shop was founded in 2010 by a group of passionate
            florists who wanted to bring beauty and joy to our community. Over
            the years, we have grown from a small local shop to a well-known
            name, expanding our services to online orders and nationwide
            delivery.
          </p>
          <p className="text-lg text-semiBlack">
            From the beginning, our goal has always been to provide
            high-quality, fresh flowers with a personal touch. We're proud to
            continue that tradition today!
          </p>
        </section>

        {/* Meet the Team */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            Our talented team of florists is passionate about flowers and
            dedicated to making sure each arrangement is perfect. Whether it's a
            wedding, birthday, or just a simple bouquet to brighten your day,
            our team is here to help.
          </p>
          <p className="text-lg text-semiBlack">
            Each member brings years of experience and a love for flowers,
            making our shop a trusted place for all your floral needs.
          </p>
        </section>

        {/* Environmental Responsibility */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            Environmental Responsibility
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            We are committed to sustainability and reducing our environmental
            impact. That's why we source eco-friendly and sustainable flowers
            whenever possible. We also work with local farmers to minimize
            carbon emissions associated with transportation.
          </p>
          <p className="text-lg text-semiBlack">
            In addition to our eco-friendly flowers, we also use recyclable
            materials for our packaging and encourage our customers to reuse or
            recycle their vases and wrappings.
          </p>
        </section>

        {/* Customer Testimonials */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            "The most beautiful bouquet I’ve ever received! The flowers were
            fresh and lasted so long. Thank you for making my day so special!" –
            Sarah L.
          </p>
          <p className="text-lg text-semiBlack mb-4">
            "Amazing service and even more amazing flowers! I ordered a custom
            bouquet for my wedding, and it was absolutely perfect." – Mark P.
          </p>
          <p className="text-lg text-semiBlack">
            "I’ve been ordering flowers from this shop for years, and they never
            disappoint. Always fresh and beautifully arranged." – Emily K.
          </p>
        </section>

        {/* Community Involvement */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            Community Involvement
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            We believe in giving back to our community. That's why we partner
            with local charities and participate in community events to bring
            joy through flowers. From donating to schools and hospitals to
            providing flowers for community fundraisers, we are proud to be a
            part of this wonderful community.
          </p>
          <p className="text-lg text-semiBlack">
            Your support helps us continue to make a positive impact in the
            lives of others.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
