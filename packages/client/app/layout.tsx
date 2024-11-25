'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu, theme } from 'antd';

import Providers from './providers';

const { Header, Content } = Layout;

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const pathname = usePathname();

  const getSelectedKey = () => {
    if (pathname === '/') return '1';
    if (pathname === '/manage') return '2';
    return '';
  };

  return (
    <html lang="ru">
      <body style={{ margin: 0 }}>
        <Providers>
          <AntdRegistry>
            <Layout>
              <Header style={{ backgroundColor: colorBgContainer }}>
                <div className="demo-logo" />
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={[getSelectedKey()]}
                  items={[
                    {
                      key: '1',
                      label: <Link href="/">Каталог</Link>,
                    },
                    {
                      key: '2',
                      label: <Link href="/manage">Управление товарами</Link>,
                    },
                  ]}
                />
              </Header>
              <Content style={{ padding: '0 48px' }}>
                <div
                  style={{
                    background: colorBgContainer,
                    minHeight: 280,
                    padding: 24,
                    borderRadius: borderRadiusLG,
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
