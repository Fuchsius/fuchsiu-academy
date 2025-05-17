export function ColorShowcase() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-mysecondary bg-stroke">
        Color Theme Showcase
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-mysecondary text-white rounded-lg shadow-md">
          Purple (Primary)
        </div>
        <div className="p-6 bg-myprimary text-white rounded-lg shadow-md">
          Dark Blue
        </div>
        <div className="p-6 bg-light-purple text-dark-blue rounded-lg shadow-md">
          Light Purple
        </div>
        <div className="p-6 bg-mytextbg text-dark-blue rounded-lg shadow-md">
          Yellow (Accent)
        </div>
        <div className="p-6 bg-mystar text-dark-blue border rounded-lg shadow-md">
          White
        </div>
        <div className="p-6 bg-mywhitetext text-foreground border rounded-lg shadow-md">
          Background
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">UI Components with Theme</h3>
      <div className="space-y-4">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Primary Button
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md ml-4">
          Secondary Button
        </button>
        <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md ml-4">
          Accent Button
        </button>
      </div>
    </div>
  );
}
