import React from "react";

import { Renderer, Express, Route } from "@root/index";
import { RouteNode, Elements } from "@root/types";

const handlerRoute = Object.freeze(() => {});

describe("Test routes", () => {
  test("Test simple router", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test("Test route with two childs", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test("Test nested routes", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />

          <Route method="GET" path="/test2" handle={handlerRoute} />
          <Route method="GET" path="/test3" handle={handlerRoute} />

          <Route path="/test5" handle={handlerRoute}>
            <Route method="GET" path="/test6" handle={handlerRoute} />
            <Route method="GET" path="/test7" handle={handlerRoute} />
            <Route method="GET" handle={handlerRoute} />

            <Route path="/test8" handle={handlerRoute}>
              <Route method="GET" path="/test9" handle={handlerRoute} />
              <Route method="POST" path="/test9" handle={handlerRoute} />
              <Route method="GET" handle={handlerRoute} />
            </Route>
          </Route>
        </Route>
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].path).toBe("/test/test2");
    expect(compiled.routes![2].method).toBe("GET");
    expect(compiled.routes![2].handle).toBe(handlerRoute);

    expect(compiled.routes![3].type).toBe(Elements.Route);
    expect(compiled.routes![3].path).toBe("/test/test3");
    expect(compiled.routes![3].method).toBe("GET");
    expect(compiled.routes![3].handle).toBe(handlerRoute);

    expect(compiled.routes![4].type).toBe(Elements.Route);
    expect(compiled.routes![4].path).toBe("/test/test5/test6");
    expect(compiled.routes![4].method).toBe("GET");
    expect(compiled.routes![4].handle).toBe(handlerRoute);

    expect(compiled.routes![5].type).toBe(Elements.Route);
    expect(compiled.routes![5].path).toBe("/test/test5/test7");
    expect(compiled.routes![5].method).toBe("GET");
    expect(compiled.routes![5].handle).toBe(handlerRoute);

    expect(compiled.routes![6].type).toBe(Elements.Route);
    expect(compiled.routes![6].path).toBe("/test/test5");
    expect(compiled.routes![6].method).toBe("GET");
    expect(compiled.routes![6].handle).toBe(handlerRoute);

    expect(compiled.routes![7].type).toBe(Elements.Route);
    expect(compiled.routes![7].path).toBe("/test/test5/test8/test9");
    expect(compiled.routes![7].method).toBe("GET");
    expect(compiled.routes![7].handle).toBe(handlerRoute);

    expect(compiled.routes![8].type).toBe(Elements.Route);
    expect(compiled.routes![8].path).toBe("/test/test5/test8/test9");
    expect(compiled.routes![8].method).toBe("POST");
    expect(compiled.routes![8].handle).toBe(handlerRoute);

    expect(compiled.routes![9].type).toBe(Elements.Route);
    expect(compiled.routes![9].path).toBe("/test/test5/test8");
    expect(compiled.routes![9].method).toBe("GET");
    expect(compiled.routes![9].handle).toBe(handlerRoute);
  });
});

describe("Extra test routes", () => {
  test("Using custom component", () => {
    const CustomComponent = () => (
      <Route path="/pato">
        <Route method="GET" handle={handlerRoute} />
        <Route method="POST" handle={handlerRoute} />
      </Route>
    );
    const compiled = Renderer.compile(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <CustomComponent />
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].path).toBe("/pato");
    expect(compiled.routes![2].method).toBe("GET");
    expect(compiled.routes![2].handle).toBe(handlerRoute);

    expect(compiled.routes![3].type).toBe(Elements.Route);
    expect(compiled.routes![3].path).toBe("/pato");
    expect(compiled.routes![3].method).toBe("POST");
    expect(compiled.routes![3].handle).toBe(handlerRoute);
  });
  test("Using react fragment", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <React.Fragment>
          <Route path="/pato">
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
          </Route>
        </React.Fragment>
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);


    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].path).toBe("/pato");
    expect(compiled.routes![2].method).toBe("GET");
    expect(compiled.routes![2].handle).toBe(handlerRoute);

    expect(compiled.routes![3].type).toBe(Elements.Route);
    expect(compiled.routes![3].path).toBe("/pato");
    expect(compiled.routes![3].method).toBe("POST");
    expect(compiled.routes![3].handle).toBe(handlerRoute);
  });
});
