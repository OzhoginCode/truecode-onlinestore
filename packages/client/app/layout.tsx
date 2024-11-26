'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu, theme } from 'antd';

import Providers from './providers';

const { Header, Content } = Layout;

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const { token: { colorBgContainer } } = theme.useToken();
  const pathname = usePathname();

  return (
    <html lang="ru">
      <body style={{ margin: 0 }}>
        <Providers>
          <AntdRegistry>
            <Layout>
              <Header style={{ backgroundColor: colorBgContainer }}>
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={[pathname]}
                  items={[
                    {
                      key: '/',
                      label: <Link href="/">Каталог</Link>,
                    },
                    {
                      key: '/manage',
                      label: <Link href="/manage">Управление товарами</Link>,
                    },
                  ]}
                />
              </Header>
              <Content>
                <div
                  style={{
                    background: colorBgContainer,
                    padding: 24,
                  }}
                >
                  {children}
                </div>
              </Content>
            </Layout>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
